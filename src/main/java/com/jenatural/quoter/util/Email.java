package com.jenatural.quoter.util;

import java.util.Properties;

import javax.activation.DataHandler;
import javax.activation.DataSource;
import javax.mail.Authenticator;
import javax.mail.Message;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;
import javax.mail.util.ByteArrayDataSource;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class Email {
    @Value("${my.email.username}")
    private String username;
    @Value("${my.email.password}")
    private String password;
    @Value("${my.email.host}")
    private String host;
    @Value("${my.email.port}")
    private String port;
    private Session session;
    private Properties props;
    private Authenticator authenticator;
    private String name = "JE Natural - Quote";

    public String sendEmail(String recipient, String subject, String body, byte[] excelBytes, String fileName) {
        props = new Properties();
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.smtp.host", host);
        props.put("mail.smtp.port", port);

        authenticator = new Authenticator() {
            @Override
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(username, password);
            }
        };

        session = Session.getInstance(props, authenticator);

        try {
            Message message = new MimeMessage(session);

            message.setFrom(new InternetAddress(username, name));

            message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(recipient));

            message.setSubject(subject);

            MimeMultipart multipart = new MimeMultipart();

            MimeBodyPart textPart = new MimeBodyPart();
            textPart.setText(body);
            multipart.addBodyPart(textPart);

            MimeBodyPart attachmentPart = new MimeBodyPart();
            DataSource dataSource = new ByteArrayDataSource(excelBytes, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
            attachmentPart.setDataHandler(new DataHandler(dataSource));
            attachmentPart.setFileName(fileName);
            multipart.addBodyPart(attachmentPart);

            message.setContent(multipart);

            Transport.send(message);

            return "Email sent successfully to " + recipient;
        } catch (Exception e) {
            return "Email not sent to " + recipient + "\n" + e.getMessage();
        }
    }
}
