let handler = async (m, { conn, isAdmin, isBotAdmin, usedPrefix, command }) => {
    if (!m.quoted) {
        return m.reply(
            `⚠️ خاصك دير Reply على الرسالة اللي بغيتي تحيدها باستعمال:\n\n` +
            `${usedPrefix}${command}`
        );
    }

    try {
        // إذا كانت الرسالة ديال البوت
        if (m.quoted.fromMe) {
            await m.quoted.delete();
            return;
        }

        // حذف رسالة شخص آخر داخل المجموعة
        if (!isBotAdmin) return global.dfail('botAdmin', m, conn);
        if (!isAdmin) return global.dfail('admin', m, conn);

        const contextInfo =
            m.message?.extendedTextMessage?.contextInfo;

        const participant = contextInfo?.participant;
        const messageId = contextInfo?.stanzaId;

        if (!participant || !messageId) {
            return m.reply('❌ ماقدرتش نحدد الرسالة اللي بغيتي تحيد.');
        }

        await conn.sendMessage(m.chat, {
            delete: {
                remoteJid: m.chat,
                fromMe: false,
                id: messageId,
                participant: participant
            }
        });

    } catch (e) {
        console.error('Delete message error:', e);
        return m.reply('❌ وقع مشكل وأنا كنحاول نحيد الرسالة.');
    }
};

handler.help = [
    'del',
    'deletemsg',
    'حدف',
    'محي',
    'حيد'
];

handler.tags = ['group'];

handler.command = /^(del|deletemsg|removemsg|حدف|محي|حيد)$/i;

export default handler;