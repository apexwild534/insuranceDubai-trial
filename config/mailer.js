require('dotenv').config();

module.exports = {
  from: {
    name:    process.env.SENDER_NAME  || 'InsuranceDubai.com',
    address: process.env.SENDER_EMAIL || 'noreply@insurancedubai.com'
  },

  to: process.env.BROKER_EMAIL,

  subjects: {
    quote:   'New Quote Request — InsuranceDubai.com',
    contact: 'New Contact Form Lead — InsuranceDubai.com',
    chatbot: 'New Chatbot Lead — InsuranceDubai.com'
  },

  template: function (data) {
    var rows = [
      ['Source Page',     data.source_page   || '—'],
      ['Source Widget',   data.source_widget || '—'],
      ['Full Name',       data.name          || '—'],
      ['Email',           data.email         || '—'],
      ['Phone',           data.phone         || '—'],
      ['Age Group',       data.age           || '—'],
      ['Insurance Type',  data.insurance_type|| '—'],
      ['Message',         data.message       || '—'],
      ['Submitted At',    data.submitted_at  || new Date().toISOString()]
    ];

    var tableRows = rows.map(function (r) {
      return '<tr><td style="padding:8px 14px;font-weight:600;color:#555;white-space:nowrap;border-bottom:1px solid #f0f0f0">'
        + r[0]
        + '</td><td style="padding:8px 14px;color:#111;border-bottom:1px solid #f0f0f0">'
        + r[1]
        + '</td></tr>';
    }).join('');

    return {
      subject: module.exports.subjects[data.source_widget] || module.exports.subjects.contact,
      html: '<!DOCTYPE html><html><body style="font-family:Inter,Arial,sans-serif;background:#f5f7fa;padding:32px 0">'
        + '<div style="max-width:560px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,.08)">'
        + '<div style="background:#1a3c6e;padding:24px 28px">'
        + '<h2 style="color:#fff;margin:0;font-size:18px">🛡️ New Lead — InsuranceDubai.com</h2>'
        + '</div>'
        + '<table style="width:100%;border-collapse:collapse;font-size:14px">' + tableRows + '</table>'
        + '<div style="padding:20px 28px;background:#f5f7fa;font-size:12px;color:#888">'
        + 'This lead was submitted via InsuranceDubai.com. Please follow up within 1 hour.'
        + '</div>'
        + '</div></body></html>',
      text: rows.map(function (r) { return r[0] + ': ' + r[1]; }).join('\n')
    };
  }
};
