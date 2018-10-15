 # Node Memail
 
 ### Install and Configuration
 
 To install this module, using command:
  
 ``` npm install memail --save```
 
 After install completely, add file config in folder ``config`` of
 root app directory name `` mail.json `` with content below:
 
 ``` 
 {
     "config_send_email": [
         {
             "default": [
                {
                     "to": ["emaildefault1@gmail.com", "emaildefault2@gmail.com"],
                     "subject": "Subject default",
                     "name":"Name default"
                }
             ]
         },
         {
             "groups": [
                 {
                     "developers": ["developers1@gmail.com", "developers2@gmail.com"],
                     "managers": ["managers1@gmail.com", "managers2@gmail.com"]
                 }
             ]
         }
     ]
 }
 ```
 
 The content file is default value for module send mail. Add to this file
 content the default value what you want. If you do not want using default config email params, 
 you can use ``options`` with params like this: 
 
 ```
 var options = {
     "to": ["developer1@gmail.com", "developer2n@gmail.com"],
     "view": "newsletter.ejs", //"content": "Content",
     "data": {username: 'developer1', full_name: 'Jonh Doe'},
     "subject": "Test email from first node module",
     "groups": "developers",
     "name" : "Test Email",
   }
   
```
 ``view`` and ``data`` for using templates. Just send email text, using `content ` param.
 
 Then, add file ``.env`` at root app directory with content below:
 
 ```
 MAIL_SERVICE=Gmail
 MAIL_DRIVER=smtp
 MAIL_HOST=smtp.gmail.com
 MAIL_PORT=465
 MAIL_SECURE=true
 MAIL_USERNAME=developer@gmail.com
 MAIL_PASSWORD=create_app_password_in_gmail_setting
 
 GOOGLE_CLIENT_ID=000000000000-xxx0.apps.googleusercontent.com
 GOOGLE_CLIENT_SECRET=XxxxxXXxX0xxxxxxxx0XXxX0
 GOOGLE_REFRESH_TOKEN=1/XXxXxsss-xxxXXXXXxXxx0XXXxxXXx0x00xxx
 GOOGLE_ACCESS_TOKEN=ya29.Xx_XX0xxxxx-xX0X0XxXXxXxXXXxX0x
```
If using google username and password to connect smtp socket not success. You 
can use google oauth2 to connect smtp socket. See this youtube link: ```https://www.youtube.com/watch?v=JJ44WA_eV8E``` to known
how to create google console app and get access token.

If you using email template, create folder ``templates`` and add files ``*.ejs``