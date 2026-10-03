let handler = async (m, { conn, isBotAdmin, isAdmin, participants }) => {
    if (!m.isGroup) return m.reply('❌ هذا الأمر خاص بالمجموعات فقط')
    if (!isBotAdmin) return m.reply('❌ يجب أن يكون البوت أدمن لكي يقبل الطلبات')
    if (!isAdmin) return m.reply('❌ هذا الأمر خاص بالأدمن فقط')

    try {
        // جلب قائمة طلبات الانضمام
        const pending = await conn.groupRequestParticipantsList(m.chat)
        
        if (pending.length === 0) {
            return m.reply('✅ لا يوجد أي طلبات انضمام معلقة')
        }

        await m.reply(`⏳ وجدت *${pending.length}* طلب انضمام، جاري قبول الكل...`)

        for (let p of pending) {
            await conn.groupRequestParticipantsUpdate(m.chat, [p.jid], "approve")
            await new Promise(res => setTimeout(res, 500)) // تأخير بسيط لتجنب الباند
        }

        m.reply(`✅ تم قبول *${pending.length}* عضو بنجاح بواسطة 𝐃𝐀𝐌𝐀𝐑-𝐌𝐃 👑`)

    } catch (e) {
        console.log(e)
        m.reply('❌ حدث خطأ: ' + e.message)
    }
}

handler.help = ['قبل']
handler.tags = ['group']
handler.command = /^(قبل|qbl|acceptall)$/i
handler.group = true
handler.admin = true
handler.botAdmin = true

export default handler