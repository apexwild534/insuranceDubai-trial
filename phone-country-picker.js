/**
 * phone-country-picker.js
 * Replaces every .country-code-select <select> with a
 * searchable, scrollable custom dropdown showing:
 *   Flag  Country Name  Dial Code
 * Sorted A–Z by country name. UAE (+971) is pre-selected.
 */

(function () {
  'use strict';

  /* ── Full country list sorted A–Z ── */
  var COUNTRIES = [
    { name: 'Afghanistan',                   code: '+93',   flag: '🇦🇫' },
    { name: 'Albania',                        code: '+355',  flag: '🇦🇱' },
    { name: 'Algeria',                        code: '+213',  flag: '🇩🇿' },
    { name: 'American Samoa',                 code: '+1684', flag: '🇦🇸' },
    { name: 'Andorra',                        code: '+376',  flag: '🇦🇩' },
    { name: 'Angola',                         code: '+244',  flag: '🇦🇴' },
    { name: 'Anguilla',                       code: '+1264', flag: '🇦🇮' },
    { name: 'Antarctica',                     code: '+672',  flag: '🇦🇶' },
    { name: 'Antigua and Barbuda',            code: '+1268', flag: '🇦🇬' },
    { name: 'Argentina',                      code: '+54',   flag: '🇦🇷' },
    { name: 'Armenia',                        code: '+374',  flag: '🇦🇲' },
    { name: 'Aruba',                          code: '+297',  flag: '🇦🇼' },
    { name: 'Australia',                      code: '+61',   flag: '🇦🇺' },
    { name: 'Austria',                        code: '+43',   flag: '🇦🇹' },
    { name: 'Azerbaijan',                     code: '+994',  flag: '🇦🇿' },
    { name: 'Bahamas',                        code: '+1242', flag: '🇧🇸' },
    { name: 'Bahrain',                        code: '+973',  flag: '🇧🇭' },
    { name: 'Bangladesh',                     code: '+880',  flag: '🇧🇩' },
    { name: 'Barbados',                       code: '+1246', flag: '🇧🇧' },
    { name: 'Belarus',                        code: '+375',  flag: '🇧🇾' },
    { name: 'Belgium',                        code: '+32',   flag: '🇧🇪' },
    { name: 'Belize',                         code: '+501',  flag: '🇧🇿' },
    { name: 'Benin',                          code: '+229',  flag: '🇧🇯' },
    { name: 'Bermuda',                        code: '+1441', flag: '🇧🇲' },
    { name: 'Bhutan',                         code: '+975',  flag: '🇧🇹' },
    { name: 'Bolivia',                        code: '+591',  flag: '🇧🇴' },
    { name: 'Bosnia and Herzegovina',         code: '+387',  flag: '🇧🇦' },
    { name: 'Botswana',                       code: '+267',  flag: '🇧🇼' },
    { name: 'Brazil',                         code: '+55',   flag: '🇧🇷' },
    { name: 'British Indian Ocean Territory', code: '+246',  flag: '🇮🇴' },
    { name: 'British Virgin Islands',         code: '+1284', flag: '🇻🇬' },
    { name: 'Brunei',                         code: '+673',  flag: '🇧🇳' },
    { name: 'Bulgaria',                       code: '+359',  flag: '🇧🇬' },
    { name: 'Burkina Faso',                   code: '+226',  flag: '🇧🇫' },
    { name: 'Burundi',                        code: '+257',  flag: '🇧🇮' },
    { name: 'Cambodia',                       code: '+855',  flag: '🇰🇭' },
    { name: 'Cameroon',                       code: '+237',  flag: '🇨🇲' },
    { name: 'Canada',                         code: '+1',    flag: '🇨🇦' },
    { name: 'Cape Verde',                     code: '+238',  flag: '🇨🇻' },
    { name: 'Cayman Islands',                 code: '+1345', flag: '🇰🇾' },
    { name: 'Central African Republic',       code: '+236',  flag: '🇨🇫' },
    { name: 'Chad',                           code: '+235',  flag: '🇹🇩' },
    { name: 'Chile',                          code: '+56',   flag: '🇨🇱' },
    { name: 'China',                          code: '+86',   flag: '🇨🇳' },
    { name: 'Christmas Island',               code: '+61',   flag: '🇨🇽' },
    { name: 'Cocos Islands',                  code: '+61',   flag: '🇨🇨' },
    { name: 'Colombia',                       code: '+57',   flag: '🇨🇴' },
    { name: 'Comoros',                        code: '+269',  flag: '🇰🇲' },
    { name: 'Congo',                          code: '+242',  flag: '🇨🇬' },
    { name: 'Cook Islands',                   code: '+682',  flag: '🇨🇰' },
    { name: 'Costa Rica',                     code: '+506',  flag: '🇨🇷' },
    { name: 'Croatia',                        code: '+385',  flag: '🇭🇷' },
    { name: 'Cuba',                           code: '+53',   flag: '🇨🇺' },
    { name: 'Curaçao',                        code: '+599',  flag: '🇨🇼' },
    { name: 'Cyprus',                         code: '+357',  flag: '🇨🇾' },
    { name: 'Czech Republic',                 code: '+420',  flag: '🇨🇿' },
    { name: 'DR Congo',                       code: '+243',  flag: '🇨🇩' },
    { name: 'Denmark',                        code: '+45',   flag: '🇩🇰' },
    { name: 'Djibouti',                       code: '+253',  flag: '🇩🇯' },
    { name: 'Dominica',                       code: '+1767', flag: '🇩🇲' },
    { name: 'Dominican Republic',             code: '+1809', flag: '🇩🇴' },
    { name: 'East Timor',                     code: '+670',  flag: '🇹🇱' },
    { name: 'Ecuador',                        code: '+593',  flag: '🇪🇨' },
    { name: 'Egypt',                          code: '+20',   flag: '🇪🇬' },
    { name: 'El Salvador',                    code: '+503',  flag: '🇸🇻' },
    { name: 'Equatorial Guinea',              code: '+240',  flag: '🇬🇶' },
    { name: 'Eritrea',                        code: '+291',  flag: '🇪🇷' },
    { name: 'Estonia',                        code: '+372',  flag: '🇪🇪' },
    { name: 'Eswatini',                       code: '+268',  flag: '🇸🇿' },
    { name: 'Ethiopia',                       code: '+251',  flag: '🇪🇹' },
    { name: 'Falkland Islands',               code: '+500',  flag: '🇫🇰' },
    { name: 'Faroe Islands',                  code: '+298',  flag: '🇫🇴' },
    { name: 'Fiji',                           code: '+679',  flag: '🇫🇯' },
    { name: 'Finland',                        code: '+358',  flag: '🇫🇮' },
    { name: 'France',                         code: '+33',   flag: '🇫🇷' },
    { name: 'French Guiana',                  code: '+594',  flag: '🇬🇫' },
    { name: 'French Polynesia',               code: '+689',  flag: '🇵🇫' },
    { name: 'Gabon',                          code: '+241',  flag: '🇬🇦' },
    { name: 'Gambia',                         code: '+220',  flag: '🇬🇲' },
    { name: 'Georgia',                        code: '+995',  flag: '🇬🇪' },
    { name: 'Germany',                        code: '+49',   flag: '🇩🇪' },
    { name: 'Ghana',                          code: '+233',  flag: '🇬🇭' },
    { name: 'Gibraltar',                      code: '+350',  flag: '🇬🇮' },
    { name: 'Greece',                         code: '+30',   flag: '🇬🇷' },
    { name: 'Greenland',                      code: '+299',  flag: '🇬🇱' },
    { name: 'Grenada',                        code: '+1473', flag: '🇬🇩' },
    { name: 'Guadeloupe',                     code: '+590',  flag: '🇬🇵' },
    { name: 'Guam',                           code: '+1671', flag: '🇬🇺' },
    { name: 'Guatemala',                      code: '+502',  flag: '🇬🇹' },
    { name: 'Guinea',                         code: '+224',  flag: '🇬🇳' },
    { name: 'Guinea-Bissau',                  code: '+245',  flag: '🇬🇼' },
    { name: 'Guyana',                         code: '+592',  flag: '🇬🇾' },
    { name: 'Haiti',                          code: '+509',  flag: '🇭🇹' },
    { name: 'Honduras',                       code: '+504',  flag: '🇭🇳' },
    { name: 'Hong Kong',                      code: '+852',  flag: '🇭🇰' },
    { name: 'Hungary',                        code: '+36',   flag: '🇭🇺' },
    { name: 'Iceland',                        code: '+354',  flag: '🇮🇸' },
    { name: 'India',                          code: '+91',   flag: '🇮🇳' },
    { name: 'Indonesia',                      code: '+62',   flag: '🇮🇩' },
    { name: 'Iran',                           code: '+98',   flag: '🇮🇷' },
    { name: 'Iraq',                           code: '+964',  flag: '🇮🇶' },
    { name: 'Ireland',                        code: '+353',  flag: '🇮🇪' },
    { name: 'Israel',                         code: '+972',  flag: '🇮🇱' },
    { name: 'Italy',                          code: '+39',   flag: '🇮🇹' },
    { name: 'Ivory Coast',                    code: '+225',  flag: '🇨🇮' },
    { name: 'Jamaica',                        code: '+1876', flag: '🇯🇲' },
    { name: 'Japan',                          code: '+81',   flag: '🇯🇵' },
    { name: 'Jordan',                         code: '+962',  flag: '🇯🇴' },
    { name: 'Kazakhstan',                     code: '+7',    flag: '🇰🇿' },
    { name: 'Kenya',                          code: '+254',  flag: '🇰🇪' },
    { name: 'Kiribati',                       code: '+686',  flag: '🇰🇮' },
    { name: 'Kosovo',                         code: '+383',  flag: '🇽🇰' },
    { name: 'Kuwait',                         code: '+965',  flag: '🇰🇼' },
    { name: 'Kyrgyzstan',                     code: '+996',  flag: '🇰🇬' },
    { name: 'Laos',                           code: '+856',  flag: '🇱🇦' },
    { name: 'Latvia',                         code: '+371',  flag: '🇱🇻' },
    { name: 'Lebanon',                        code: '+961',  flag: '🇱🇧' },
    { name: 'Lesotho',                        code: '+266',  flag: '🇱🇸' },
    { name: 'Liberia',                        code: '+231',  flag: '🇱🇷' },
    { name: 'Libya',                          code: '+218',  flag: '🇱🇾' },
    { name: 'Liechtenstein',                  code: '+423',  flag: '🇱🇮' },
    { name: 'Lithuania',                      code: '+370',  flag: '🇱🇹' },
    { name: 'Luxembourg',                     code: '+352',  flag: '🇱🇺' },
    { name: 'Macau',                          code: '+853',  flag: '🇲🇴' },
    { name: 'Madagascar',                     code: '+261',  flag: '🇲🇬' },
    { name: 'Malawi',                         code: '+265',  flag: '🇲🇼' },
    { name: 'Malaysia',                       code: '+60',   flag: '🇲🇾' },
    { name: 'Maldives',                       code: '+960',  flag: '🇲🇻' },
    { name: 'Mali',                           code: '+223',  flag: '🇲🇱' },
    { name: 'Malta',                          code: '+356',  flag: '🇲🇹' },
    { name: 'Marshall Islands',               code: '+692',  flag: '🇲🇭' },
    { name: 'Martinique',                     code: '+596',  flag: '🇲🇶' },
    { name: 'Mauritania',                     code: '+222',  flag: '🇲🇷' },
    { name: 'Mauritius',                      code: '+230',  flag: '🇲🇺' },
    { name: 'Mayotte',                        code: '+262',  flag: '🇾🇹' },
    { name: 'Mexico',                         code: '+52',   flag: '🇲🇽' },
    { name: 'Micronesia',                     code: '+691',  flag: '🇫🇲' },
    { name: 'Moldova',                        code: '+373',  flag: '🇲🇩' },
    { name: 'Monaco',                         code: '+377',  flag: '🇲🇨' },
    { name: 'Mongolia',                       code: '+976',  flag: '🇲🇳' },
    { name: 'Montenegro',                     code: '+382',  flag: '🇲🇪' },
    { name: 'Montserrat',                     code: '+1664', flag: '🇲🇸' },
    { name: 'Morocco',                        code: '+212',  flag: '🇲🇦' },
    { name: 'Mozambique',                     code: '+258',  flag: '🇲🇿' },
    { name: 'Myanmar',                        code: '+95',   flag: '🇲🇲' },
    { name: 'Namibia',                        code: '+264',  flag: '🇳🇦' },
    { name: 'Nauru',                          code: '+674',  flag: '🇳🇷' },
    { name: 'Nepal',                          code: '+977',  flag: '🇳🇵' },
    { name: 'Netherlands',                    code: '+31',   flag: '🇳🇱' },
    { name: 'New Caledonia',                  code: '+687',  flag: '🇳🇨' },
    { name: 'New Zealand',                    code: '+64',   flag: '🇳🇿' },
    { name: 'Nicaragua',                      code: '+505',  flag: '🇳🇮' },
    { name: 'Niger',                          code: '+227',  flag: '🇳🇪' },
    { name: 'Nigeria',                        code: '+234',  flag: '🇳🇬' },
    { name: 'Niue',                           code: '+683',  flag: '🇳🇺' },
    { name: 'North Korea',                    code: '+850',  flag: '🇰🇵' },
    { name: 'North Macedonia',                code: '+389',  flag: '🇲🇰' },
    { name: 'Northern Mariana Islands',       code: '+1670', flag: '🇲🇵' },
    { name: 'Norway',                         code: '+47',   flag: '🇳🇴' },
    { name: 'Oman',                           code: '+968',  flag: '🇴🇲' },
    { name: 'Pakistan',                       code: '+92',   flag: '🇵🇰' },
    { name: 'Palau',                          code: '+680',  flag: '🇵🇼' },
    { name: 'Palestine',                      code: '+970',  flag: '🇵🇸' },
    { name: 'Panama',                         code: '+507',  flag: '🇵🇦' },
    { name: 'Papua New Guinea',               code: '+675',  flag: '🇵🇬' },
    { name: 'Paraguay',                       code: '+595',  flag: '🇵🇾' },
    { name: 'Peru',                           code: '+51',   flag: '🇵🇪' },
    { name: 'Philippines',                    code: '+63',   flag: '🇵🇭' },
    { name: 'Poland',                         code: '+48',   flag: '🇵🇱' },
    { name: 'Portugal',                       code: '+351',  flag: '🇵🇹' },
    { name: 'Puerto Rico',                    code: '+1787', flag: '🇵🇷' },
    { name: 'Qatar',                          code: '+974',  flag: '🇶🇦' },
    { name: 'Réunion',                        code: '+262',  flag: '🇷🇪' },
    { name: 'Romania',                        code: '+40',   flag: '🇷🇴' },
    { name: 'Russia',                         code: '+7',    flag: '🇷🇺' },
    { name: 'Rwanda',                         code: '+250',  flag: '🇷🇼' },
    { name: 'Saint Helena',                   code: '+290',  flag: '🇸🇭' },
    { name: 'Saint Kitts and Nevis',          code: '+1869', flag: '🇰🇳' },
    { name: 'Saint Lucia',                    code: '+1758', flag: '🇱🇨' },
    { name: 'Saint Martin',                   code: '+590',  flag: '🇲🇫' },
    { name: 'Saint Pierre and Miquelon',      code: '+508',  flag: '🇵🇲' },
    { name: 'Saint Vincent and the Grenadines', code: '+1784', flag: '🇻🇨' },
    { name: 'Samoa',                          code: '+685',  flag: '🇼🇸' },
    { name: 'San Marino',                     code: '+378',  flag: '🇸🇲' },
    { name: 'São Tomé and Príncipe',          code: '+239',  flag: '🇸🇹' },
    { name: 'Saudi Arabia',                   code: '+966',  flag: '🇸🇦' },
    { name: 'Senegal',                        code: '+221',  flag: '🇸🇳' },
    { name: 'Serbia',                         code: '+381',  flag: '🇷🇸' },
    { name: 'Seychelles',                     code: '+248',  flag: '🇸🇨' },
    { name: 'Sierra Leone',                   code: '+232',  flag: '🇸🇱' },
    { name: 'Singapore',                      code: '+65',   flag: '🇸🇬' },
    { name: 'Sint Maarten',                   code: '+1721', flag: '🇸🇽' },
    { name: 'Slovakia',                       code: '+421',  flag: '🇸🇰' },
    { name: 'Slovenia',                       code: '+386',  flag: '🇸🇮' },
    { name: 'Solomon Islands',                code: '+677',  flag: '🇸🇧' },
    { name: 'Somalia',                        code: '+252',  flag: '🇸🇴' },
    { name: 'South Africa',                   code: '+27',   flag: '🇿🇦' },
    { name: 'South Korea',                    code: '+82',   flag: '🇰🇷' },
    { name: 'South Sudan',                    code: '+211',  flag: '🇸🇸' },
    { name: 'Spain',                          code: '+34',   flag: '🇪🇸' },
    { name: 'Sri Lanka',                      code: '+94',   flag: '🇱🇰' },
    { name: 'Sudan',                          code: '+249',  flag: '🇸🇩' },
    { name: 'Suriname',                       code: '+597',  flag: '🇸🇷' },
    { name: 'Sweden',                         code: '+46',   flag: '🇸🇪' },
    { name: 'Switzerland',                    code: '+41',   flag: '🇨🇭' },
    { name: 'Syria',                          code: '+963',  flag: '🇸🇾' },
    { name: 'Taiwan',                         code: '+886',  flag: '🇹🇼' },
    { name: 'Tajikistan',                     code: '+992',  flag: '🇹🇯' },
    { name: 'Tanzania',                       code: '+255',  flag: '🇹🇿' },
    { name: 'Thailand',                       code: '+66',   flag: '🇹🇭' },
    { name: 'Togo',                           code: '+228',  flag: '🇹🇬' },
    { name: 'Tokelau',                        code: '+690',  flag: '🇹🇰' },
    { name: 'Tonga',                          code: '+676',  flag: '🇹🇴' },
    { name: 'Trinidad and Tobago',            code: '+1868', flag: '🇹🇹' },
    { name: 'Tunisia',                        code: '+216',  flag: '🇹🇳' },
    { name: 'Turkey',                         code: '+90',   flag: '🇹🇷' },
    { name: 'Turkmenistan',                   code: '+993',  flag: '🇹🇲' },
    { name: 'Turks and Caicos Islands',       code: '+1649', flag: '🇹🇨' },
    { name: 'Tuvalu',                         code: '+688',  flag: '🇹🇻' },
    { name: 'Uganda',                         code: '+256',  flag: '🇺🇬' },
    { name: 'Ukraine',                        code: '+380',  flag: '🇺🇦' },
    { name: 'United Arab Emirates',           code: '+971',  flag: '🇦🇪' },
    { name: 'United Kingdom',                 code: '+44',   flag: '🇬🇧' },
    { name: 'United States',                  code: '+1',    flag: '🇺🇸' },
    { name: 'Uruguay',                        code: '+598',  flag: '🇺🇾' },
    { name: 'US Virgin Islands',              code: '+1340', flag: '🇻🇮' },
    { name: 'Uzbekistan',                     code: '+998',  flag: '🇺🇿' },
    { name: 'Vanuatu',                        code: '+678',  flag: '🇻🇺' },
    { name: 'Vatican City',                   code: '+39',   flag: '🇻🇦' },
    { name: 'Venezuela',                      code: '+58',   flag: '🇻🇪' },
    { name: 'Vietnam',                        code: '+84',   flag: '🇻🇳' },
    { name: 'Wallis and Futuna',              code: '+681',  flag: '🇼🇫' },
    { name: 'Western Sahara',                 code: '+212',  flag: '🇪🇭' },
    { name: 'Yemen',                          code: '+967',  flag: '🇾🇪' },
    { name: 'Zambia',                         code: '+260',  flag: '🇿🇲' },
    { name: 'Zimbabwe',                       code: '+263',  flag: '🇿🇼' }
  ];

  var DEFAULT_CODE = '+971'; /* UAE */

  /**
   * Build a custom picker and replace the given <select>.
   * The picker stores its current value on a hidden <input>
   * with the same id as the original select, so getFullPhone()
   * keeps working without any changes.
   */
  function buildPicker(select) {
    var selectId = select.id;        /* e.g. "qPhoneCode" */

    /* ── Hidden value holder (keeps getFullPhone() working) ── */
    var hidden = document.createElement('input');
    hidden.type  = 'hidden';
    hidden.id    = selectId;
    hidden.value = DEFAULT_CODE;

    /* ── Wrapper ── */
    var wrapper = document.createElement('div');
    wrapper.className   = 'ccp-wrapper';
    wrapper.setAttribute('role', 'combobox');
    wrapper.setAttribute('aria-haspopup', 'listbox');
    wrapper.setAttribute('aria-expanded', 'false');

    /* ── Trigger button ── */
    var trigger = document.createElement('button');
    trigger.type      = 'button';
    trigger.className = 'ccp-trigger';
    trigger.setAttribute('aria-label', 'Country code');

    var triggerFlag = document.createElement('span');
    triggerFlag.className = 'ccp-trigger-flag';
    triggerFlag.textContent = '🇦🇪';

    var triggerCode = document.createElement('span');
    triggerCode.className = 'ccp-trigger-code';
    triggerCode.textContent = '+971';

    var triggerArrow = document.createElement('span');
    triggerArrow.className = 'ccp-arrow';
    triggerArrow.innerHTML = '&#9660;';

    trigger.appendChild(triggerFlag);
    trigger.appendChild(triggerCode);
    trigger.appendChild(triggerArrow);

    /* ── Dropdown panel ── */
    var panel = document.createElement('div');
    panel.className = 'ccp-panel';
    panel.setAttribute('role', 'listbox');

    /* ── Search box ── */
    var searchWrap = document.createElement('div');
    searchWrap.className = 'ccp-search-wrap';

    var searchInput = document.createElement('input');
    searchInput.type        = 'text';
    searchInput.className   = 'ccp-search';
    searchInput.placeholder = 'Search country or code…';
    searchInput.setAttribute('autocomplete', 'off');
    searchInput.setAttribute('spellcheck', 'false');
    searchWrap.appendChild(searchInput);
    panel.appendChild(searchWrap);

    /* ── List ── */
    var list = document.createElement('ul');
    list.className = 'ccp-list';

    function renderList(filter) {
      var q = (filter || '').toLowerCase().trim();
      list.innerHTML = '';
      var matched = COUNTRIES.filter(function (c) {
        return !q ||
          c.name.toLowerCase().indexOf(q) !== -1 ||
          c.code.indexOf(q) !== -1;
      });
      if (matched.length === 0) {
        var empty = document.createElement('li');
        empty.className = 'ccp-empty';
        empty.textContent = 'No results';
        list.appendChild(empty);
        return;
      }
      matched.forEach(function (c) {
        var li = document.createElement('li');
        li.className = 'ccp-option';
        li.setAttribute('role', 'option');
        li.setAttribute('data-code', c.code);
        if (c.code === hidden.value) li.classList.add('ccp-selected');

        var flagSpan = document.createElement('span');
        flagSpan.className = 'ccp-opt-flag';
        flagSpan.textContent = c.flag;

        var nameSpan = document.createElement('span');
        nameSpan.className = 'ccp-opt-name';
        nameSpan.textContent = c.name;

        var codeSpan = document.createElement('span');
        codeSpan.className = 'ccp-opt-code';
        codeSpan.textContent = c.code;

        li.appendChild(flagSpan);
        li.appendChild(nameSpan);
        li.appendChild(codeSpan);

        li.addEventListener('mousedown', function (e) {
          e.preventDefault(); /* prevent input blur before we finish */
          selectCountry(c);
          closePanel();
        });

        list.appendChild(li);
      });
    }

    panel.appendChild(list);

    /* ── Select a country ── */
    function selectCountry(c) {
      hidden.value           = c.code;
      triggerFlag.textContent = c.flag;
      triggerCode.textContent = c.code;
    }

    /* ── Open / close  (panel appended to body with fixed coords) ── */
    function positionPanel() {
      var rect = trigger.getBoundingClientRect();
      var spaceBelow = window.innerHeight - rect.bottom - 8;

      panel.style.width  = '300px';
      panel.style.left   = Math.min(rect.left, window.innerWidth - 308) + 'px';
      panel.style.top    = (rect.bottom + 4) + 'px';
      panel.style.bottom = '';

      /* Cap list height to available space so panel never overflows viewport */
      var searchH = 56;
      var maxListH = Math.max(120, spaceBelow - searchH);
      list.style.maxHeight = maxListH + 'px';
    }

    function openPanel() {
      /* Move panel to body so it escapes any overflow:hidden ancestor */
      if (panel.parentNode !== document.body) {
        document.body.appendChild(panel);
      }
      panel.classList.add('ccp-open');
      wrapper.setAttribute('aria-expanded', 'true');
      searchInput.value = '';
      renderList('');
      positionPanel();
      searchInput.focus();
      var sel = list.querySelector('.ccp-selected');
      if (sel) sel.scrollIntoView({ block: 'nearest' });
    }

    function closePanel() {
      panel.classList.remove('ccp-open');
      wrapper.setAttribute('aria-expanded', 'false');
    }

    /* Reposition on scroll/resize while open */
    window.addEventListener('scroll', function () {
      if (panel.classList.contains('ccp-open')) positionPanel();
    }, true);
    window.addEventListener('resize', function () {
      if (panel.classList.contains('ccp-open')) positionPanel();
    });

    trigger.addEventListener('click', function (e) {
      e.stopPropagation();
      panel.classList.contains('ccp-open') ? closePanel() : openPanel();
    });

    searchInput.addEventListener('input', function () {
      renderList(searchInput.value);
    });

    /* Close on outside click */
    document.addEventListener('click', function (e) {
      if (!wrapper.contains(e.target)) closePanel();
    });

    /* Keyboard navigation */
    searchInput.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { closePanel(); trigger.focus(); return; }
      if (e.key === 'ArrowDown') {
        var first = list.querySelector('.ccp-option');
        if (first) first.focus();
        e.preventDefault();
      }
    });

    list.addEventListener('keydown', function (e) {
      var focused = document.activeElement;
      if (e.key === 'ArrowDown') {
        var next = focused.nextElementSibling;
        while (next && !next.classList.contains('ccp-option')) next = next.nextElementSibling;
        if (next) next.focus();
        e.preventDefault();
      } else if (e.key === 'ArrowUp') {
        var prev = focused.previousElementSibling;
        while (prev && !prev.classList.contains('ccp-option')) prev = prev.previousElementSibling;
        if (prev) { prev.focus(); } else { searchInput.focus(); }
        e.preventDefault();
      } else if (e.key === 'Enter' || e.key === ' ') {
        var code2 = focused.getAttribute('data-code');
        if (code2) {
          var country = COUNTRIES.find(function (c) { return c.code === code2 && c.flag === focused.querySelector('.ccp-opt-flag').textContent; });
          if (country) selectCountry(country);
          closePanel();
          trigger.focus();
        }
        e.preventDefault();
      } else if (e.key === 'Escape') {
        closePanel(); trigger.focus();
      }
    });

    /* Make list items focusable for keyboard nav */
    list.setAttribute('tabindex', '-1');

    /* ── Assemble ── */
    wrapper.appendChild(trigger);
    wrapper.appendChild(panel);

    /* Replace the original <select> with hidden + wrapper */
    select.parentNode.insertBefore(hidden, select);
    select.parentNode.insertBefore(wrapper, select);
    select.parentNode.removeChild(select);

    /* Initial render */
    renderList('');
  }

  /* ── Init: replace all country-code-select elements ── */
  function init() {
    var selects = document.querySelectorAll('select.country-code-select');
    selects.forEach(function (sel) { buildPicker(sel); });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
