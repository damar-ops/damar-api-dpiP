// ═══════════════════════════════════════════════════════════════
// 👞🚮 DAMAR-MD — أمر الطرد
// الأوامر:
// .Kick
// .برا
// .قش
// .طرد
// .كلبي
// .كلبتي
// الاستعمال: Reply / Mention
// ═══════════════════════════════════════════════════════════════

const handler = async (m, { conn, text, participants, command }) => {
    try {
        if (!m.isGroup)
            return m.reply('❌ هاد الأمر غير فالغروبات آ صاحبي 😂');

        // ───── تحديد الشخص ─────
        const target = m.quoted
            ? m.quoted.sender
            : m.mentionedJid?.[0]
            ? m.mentionedJid[0]
            : text
            ? text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
            : null;

        if (!target)
            return m.reply(
                `╭━━━〔 👞🚮 الطرد 〕━━━╮
│
│  📌 خاصك تشير للشخص
│  أو دير Reply على رسالتو
│
│  مثال:
│  .برا @رقم
│  .طرد @رقم
│
╰━━━━━━━━━━━━━━━━━━╯`
            );

        // ───── التأكد أن الشخص فالغروب ─────
        const exists = participants.some(
            p =>
                p.jid === target ||
                p.id === target ||
                p.phoneNumber === target
        );

        if (!exists)
            return m.reply('🤷‍♂️ هاد الشخص ما باينش ليا فالغروب.');

        // ───── ما نطردوش البوت ─────
        const botJid = conn.user?.id?.split(':')[0] + '@s.whatsapp.net';

        if (target === botJid)
            return m.reply('😂 واش بغيتي نطرد راسي؟');

        // ───── تنفيذ الطرد ─────
        await conn.groupParticipantsUpdate(
            m.chat,
            [target],
            'remove'
        );

        const name = `@${target.split('@')[0]}`;

        // ───── رسالة الطرد ─────
        const msg = `
╭━━━〔 👞🚮 𝐃𝐀𝐌𝐀𝐑-𝐌𝐃 〕━━━╮

      🚪 𝐁𝐑𝐀 𝐁𝐑𝐀 🚪

آ ${name} 😂

واخا صافي سالات الحفلة ديالك هنا،
الباب راه من تما 🚪➡️

👞 خطوة للقدّام...
🚮 ومن بعد دوز فطريقك 😂

ماشي وقت النقاش،
وماشي وقت "علاش؟" و "شنو درت؟" 🤣

📢 القرار تطبق:
╭─────────────────╮
│  ❌ خرج من الغروب
│  🚪 الباب محلول
│  👞 الطريق معروف
╰─────────────────╯

نتمنى ليك رحلة سعيدة 😂
والغروب بلا بيك غادي يبقى واقف على رجليه 💀

━━━━━━━━━━━━━━━━━━━━
      👑 𝐃𝐀𝐌𝐀𝐑-𝐌𝐃
      ⚡ أبو دمار شامل
━━━━━━━━━━━━━━━━━━━━

🚪 برا برا يا صاحبي 😂
👞🚮 بلا صداع الراس
`;

        await conn.sendMessage(
            m.chat,
            {
                text: msg,
                mentions: [target]
            },
            { quoted: m }
        );

    } catch (e) {
        console.error('KICK ERROR:', e);
        m.reply(
            '❌ وقع مشكل فعملية الطرد. تأكد باللي البوت Admin.'
        );
    }
};

// ───── الأوامر ─────
handler.command = /^(kick|برا|قش|طرد|كلبي|كلبتي)$/i;

handler.help = [
    'kick',
    'برا',
    'قش',
    'طرد',
    'كلبي',
    'كلبتي'
];

handler.tags = ['group'];

handler.group = true;
handler.admin = true;
handler.botAdmin = true;

export default handler;