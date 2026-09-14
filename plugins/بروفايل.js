// ═══════════════════════════════════════
// 👑 DAMAR-MD — SET PROFILE PICTURE كاملة بلا خلفية سوداء
// الأمر: .setpp
// ═══════════════════════
import sharp from 'sharp'

let handler = async (m, { conn }) => {
    try {
        const q = m.quoted
        if (!q) return m.reply('📸 دير Reply على الصورة اللي بغيتي تديرها بروفايل.')
        
        const mime = (q.msg && q.msg.mimetype) || q.mimetype || ''
        if (!/^image\//i.test(mime)) return m.reply('❌ خاصك صورة JPG/PNG.')

        await m.reply('⏳ كنعالج الصورة...')

        const buffer = await q.download()
        if (!buffer) return m.reply('❌ ماقدرتش نحمل الصورة.')

        // كناخدو لون من اطراف الصورة باش نعمرو بيه الخلفية
        const metadata = await sharp(buffer).metadata()
        const { width, height } = metadata

        // كنصغرو الصورة الاصلية باش تدخل ف 1280
        const resized = sharp(buffer).resize(1280, 1280, { fit: 'inside' })

        // كنصنعو خلفية مربعة 1280x1280 بلون متدرج من الصورة
        const background = await sharp(buffer)
            .resize(1280, 1280, { fit: 'cover' }) // كنعمرو كامل
            .blur(50) // كنضبابوها
            .toBuffer()

        // كنحطو الصورة الاصلية فوق الخلفية فالوسط
        const img = await sharp(background)
            .composite([{ input: await resized.toBuffer(), gravity: 'center' }])
            .jpeg({ quality: 95 })
            .toBuffer()

        const jid = conn.user?.id
        await conn.updateProfilePicture(jid, img)

        await m.reply('✅ تم تغيير صورة البروفايل 👑\nالصورة كاملة بلا خلفية سوداء.\n\n𝐃𝐀𝐌𝐀𝐑-𝐌𝐃')

    } catch (e) {
        console.error(e)
        await m.reply('❌ خطأ: ' + e.message)
    }
}

handler.command = /^setpp$/i
handler.owner = true
export default handler