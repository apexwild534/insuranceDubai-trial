require('dotenv').config();
const { Resend }  = require('resend');
const { createClient } = require('@supabase/supabase-js');
const mailerConfig = require('../config/mailer');

const resend   = new Resend(process.env.RESEND_API_KEY);
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

function validate(body) {
  if (!body.name  || !body.name.trim())  return 'name is required';
  if (!body.phone || !body.phone.trim()) return 'phone is required';
  if (!body.insurance_type)              return 'insurance_type is required';
  return null;
}

async function saveLead(data) {
  const { error } = await supabase.from('leads').insert([{
    source_page:    data.source_page    || null,
    source_widget:  data.source_widget  || null,
    name:           data.name           || null,
    email:          data.email          || null,
    phone:          data.phone          || null,
    age_group:      data.age            || null,
    insurance_type: data.insurance_type || null,
    message:        data.message        || null,
    submitted_at:   data.submitted_at   || new Date().toISOString()
  }]);
  if (error) console.error('Supabase insert error:', error.message);
}

async function sendEmail(data) {
  const tpl = mailerConfig.template(data);
  const { error } = await resend.emails.send({
    from:    mailerConfig.from.name + ' <' + mailerConfig.from.address + '>',
    to:      [mailerConfig.to],
    subject: tpl.subject,
    html:    tpl.html,
    text:    tpl.text
  });
  if (error) console.error('Resend error:', error.message);
}

async function processLead(req, res, sourceWidget) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  const body = req.body || {};
  const err  = validate(body);
  if (err) return res.status(400).json({ ok: false, error: err });

  const data = {
    source_page:    body.source_page   || req.headers.referer || null,
    source_widget:  sourceWidget,
    name:           body.name.trim(),
    email:          (body.email || '').trim(),
    phone:          body.phone.trim(),
    age:            body.age           || null,
    insurance_type: body.insurance_type,
    message:        (body.message || '').trim(),
    submitted_at:   new Date().toISOString()
  };

  await Promise.all([saveLead(data), sendEmail(data)]);

  return res.status(200).json({ ok: true });
}

module.exports = { processLead };
