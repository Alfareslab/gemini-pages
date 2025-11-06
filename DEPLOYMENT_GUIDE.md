# 📘 دليل النشر على GitHub + Cloudflare Pages

---

## 🎯 الهدف

نشر المشروع على **Cloudflare Pages** عبر **GitHub** لتحقيق:
- ✅ نشر تلقائي عند كل تحديث
- ✅ سهولة تعديل "عقل" الشات بوت من ملف `config.json`
- ✅ إدارة احترافية للمشروع

---

## 📋 المتطلبات الأساسية

1. ✅ حساب **GitHub** (مجاني)
2. ✅ حساب **Cloudflare** (مجاني)
3. ✅ **Gemini API Key** من Google AI Studio
4. ✅ **رابط خدمة الإشعارات** (منشورة مسبقاً)

---

## 🚀 الخطوة 1: رفع المشروع على GitHub

### 1.1. إنشاء مستودع جديد

1. اذهب إلى [GitHub](https://github.com/new)
2. املأ البيانات:
   - **Repository name**: `gemini-chatbot` (أو أي اسم تريده)
   - **Description**: "Gemini chatbot with Cloudflare Pages"
   - **Visibility**: اختر **Private** (خاص) أو **Public** (عام)
3. **لا تضف** README أو .gitignore (موجودان في المشروع)
4. انقر على **Create repository**

### 1.2. رفع الملفات

افتح الطرفية (Terminal) في مجلد المشروع وأدخل الأوامر التالية:

```bash
# تهيئة Git
git init

# إضافة جميع الملفات
git add .

# إنشاء Commit
git commit -m "Initial commit: Gemini chatbot"

# ربط المستودع البعيد (استبدل YOUR_USERNAME و YOUR_REPO)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git

# رفع الملفات
git branch -M main
git push -u origin main
```

**ملاحظة:** استبدل `YOUR_USERNAME` باسم المستخدم الخاص بك، و `YOUR_REPO` باسم المستودع.

---

## ☁️ الخطوة 2: ربط المشروع بـ Cloudflare Pages

### 2.1. الدخول إلى Cloudflare Dashboard

1. اذهب إلى [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. سجل الدخول بحسابك

### 2.2. إنشاء مشروع Pages جديد

1. من القائمة الجانبية، اختر **Workers & Pages**
2. انقر على **Create application**
3. اختر تبويب **Pages**
4. انقر على **Connect to Git**

### 2.3. ربط GitHub

1. إذا كانت أول مرة، انقر على **Connect GitHub**
2. امنح Cloudflare الصلاحيات المطلوبة
3. اختر المستودع الذي أنشأته (`gemini-chatbot`)

### 2.4. إعدادات البناء (Build settings)

في صفحة الإعدادات:

| الحقل | القيمة |
|------|--------|
| **Project name** | `gemini-chatbot` (أو أي اسم) |
| **Production branch** | `main` |
| **Framework preset** | None |
| **Build command** | (اتركه فارغاً) |
| **Build output directory** | `/` |

انقر على **Save and Deploy**.

### 2.5. انتظار النشر الأول

سيبدأ Cloudflare في نشر المشروع. انتظر حتى ترى رسالة **"Success!"**.

---

## 🔐 الخطوة 3: إضافة المتغيرات السرية

### 3.1. الدخول إلى إعدادات المشروع

1. بعد النشر، انقر على اسم المشروع
2. اذهب إلى **Settings** > **Environment variables**

### 3.2. إضافة المتغيرات

انقر على **Add variables** وأضف المتغيرات التالية:

#### المتغير الأول: GEMINI_API_KEY

| الحقل | القيمة |
|------|--------|
| **Variable name** | `GEMINI_API_KEY` |
| **Value** | (الصق مفتاح Gemini API الخاص بك) |
| **Environment** | Production |
| **Type** | Encrypted (مشفر) |

انقر على **Save**.

#### المتغير الثاني: NOTIFICATION_SERVICE_URL

| الحقل | القيمة |
|------|--------|
| **Variable name** | `NOTIFICATION_SERVICE_URL` |
| **Value** | `https://acelab-email-notifications.alfares-acelab.workers.dev` |
| **Environment** | Production |
| **Type** | Plain text (نص عادي) |

انقر على **Save**.

### 3.3. إعادة النشر

1. اذهب إلى **Deployments**
2. اختر آخر Deployment
3. انقر على **⋯** (ثلاث نقاط) > **Retry deployment**

سيتم إعادة النشر مع المتغيرات الجديدة.

---

## ✅ الخطوة 4: اختبار المشروع

### 4.1. الحصول على رابط المشروع

بعد النشر، ستحصل على رابط مثل:

```
https://gemini-chatbot.pages.dev
```

### 4.2. اختبار الشات بوت

1. افتح الرابط في المتصفح
2. ابدأ محادثة
3. أكمل المحادثة حتى النهاية
4. تحقق من وصول الإشعارات على Telegram و WhatsApp

---

## 🧠 الخطوة 5: تعديل "عقل" الشات بوت

### 5.1. تعديل ملف config.json

1. افتح المشروع على جهازك
2. افتح ملف `config.json`
3. عدّل قيمة `systemPrompt` كما تريد
4. احفظ الملف

### 5.2. رفع التعديلات على GitHub

```bash
git add config.json
git commit -m "Update system prompt"
git push
```

### 5.3. النشر التلقائي

**Cloudflare Pages سيكتشف التغيير تلقائياً وينشر النسخة الجديدة!**

يمكنك متابعة النشر من **Deployments** في Cloudflare Dashboard.

---

## 🔧 استكشاف الأخطاء

### المشكلة: "Error calling Gemini API"

**الحل:**
- تحقق من أن `GEMINI_API_KEY` صحيح في Environment variables
- تأكد من أن المفتاح مفعّل في Google AI Studio

### المشكلة: "Notification service error"

**الحل:**
- تحقق من أن `NOTIFICATION_SERVICE_URL` صحيح
- تأكد من أن خدمة الإشعارات تعمل

### المشكلة: "Function not found"

**الحل:**
- تأكد من أن ملف `functions/api/chat.js` موجود
- تأكد من رفع جميع الملفات على GitHub

---

## 📊 مقارنة: قبل وبعد

| الجانب | قبل (Workers) | بعد (Pages) |
|--------|--------------|-------------|
| **النشر** | `wrangler deploy` | GitHub Push |
| **تعديل العقل** | تعديل كود + Deploy | تعديل JSON + Push |
| **الإعداد** | معقد | بسيط |
| **التحديثات** | يدوي | تلقائي |

---

## 🎉 الخلاصة

الآن لديك:
- ✅ مشروع منشور على Cloudflare Pages
- ✅ نشر تلقائي عبر GitHub
- ✅ تعديل سهل للعقل من ملف JSON
- ✅ نظام إشعارات يعمل بشكل صحيح

**بالتوفيق! 🚀**
