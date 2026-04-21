package com.college.placement.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

/**
 * Email Service
 * Sends emails asynchronously for notifications
 */
@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String fromEmail;

    @Value("${app.base-url:http://localhost:3000}")
    private String baseUrl;

    /**
     * Send email to admin when student submits update
     */
    @Async
    public void sendUpdateNotificationToAdmin(String studentName, String studentRegNo, String adminEmail) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setFrom(fromEmail);
            helper.setTo(adminEmail);
            helper.setSubject("New Profile Update Request - " + studentName);

            String htmlContent = buildAdminNotificationEmail(studentName, studentRegNo);
            helper.setText(htmlContent, true);

            mailSender.send(message);
            System.out.println(" Email sent to admin: " + adminEmail);

        } catch (MessagingException e) {
            System.err.println(" Failed to send email to admin: " + e.getMessage());
            throw new RuntimeException("Failed to send email", e);
        }
    }

    /**
     * Send approval email to student
     */
    @Async
    public void sendApprovalEmailToStudent(String studentName, String studentEmail) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setFrom(fromEmail);
            helper.setTo(studentEmail);
            helper.setSubject("Profile Update Approved");

            String htmlContent = buildApprovalEmail(studentName);
            helper.setText(htmlContent, true);

            mailSender.send(message);
            System.out.println(" Approval email sent to: " + studentEmail);

        } catch (MessagingException e) {
            System.err.println(" Failed to send approval email: " + e.getMessage());
            throw new RuntimeException("Failed to send email", e);
        }
    }

    /**
     * Send rejection email to student
     */
    @Async
    public void sendRejectionEmailToStudent(String studentName, String studentEmail, String reason) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setFrom(fromEmail);
            helper.setTo(studentEmail);
            helper.setSubject("Profile Update Rejected");

            String htmlContent = buildRejectionEmail(studentName, reason);
            helper.setText(htmlContent, true);

            mailSender.send(message);
            System.out.println(" Rejection email sent to: " + studentEmail);

        } catch (MessagingException e) {
            System.err.println(" Failed to send rejection email: " + e.getMessage());
            throw new RuntimeException("Failed to send email", e);
        }
    }

    /**
     * Send profile updated notification email to student
     * (When admin directly updates student profile or approves update request)
     */
    @Async
    public void sendProfileUpdatedEmail(String studentName, String studentEmail) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setFrom(fromEmail);
            helper.setTo(studentEmail);
            helper.setSubject("Your Profile Has Been Updated - SIET Placement System");

            String htmlContent = buildProfileUpdatedEmail(studentName);
            helper.setText(htmlContent, true);

            mailSender.send(message);
            System.out.println("✉️ Profile updated email sent to: " + studentEmail);

        } catch (MessagingException e) {
            System.err.println("❌ Failed to send profile updated email: " + e.getMessage());
        }
    }

    /**
     * Send password reset email
     */
    @Async
    public void sendPasswordResetEmail(String toEmail, String resetToken, String userName) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setFrom(fromEmail);
            helper.setTo(toEmail);
            helper.setSubject("Password Reset Request - SIET Placement System");

            String resetUrl = baseUrl + "/reset-password/" + resetToken;
            String htmlContent = buildPasswordResetEmail(userName, resetUrl);
            helper.setText(htmlContent, true);

            mailSender.send(message);
            System.out.println("✉️ Password reset email sent to: " + toEmail);

        } catch (MessagingException e) {
            System.err.println("❌ Failed to send password reset email: " + e.getMessage());
            throw new RuntimeException("Failed to send password reset email", e);
        }
    }

    // ==================== EMAIL TEMPLATES ====================

    private String buildAdminNotificationEmail(String studentName, String studentRegNo) {
        StringBuilder html = new StringBuilder();
        html.append("<!DOCTYPE html>");
        html.append("<html>");
        html.append("<head><style>");
        html.append("body { font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: rgb(240, 248, 240); }");
        html.append(".container { max-width: 500px; margin: 40px auto; background: #fff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }");
        html.append(".header { background: #0A8F47; color: white; padding: 40px 30px; text-align: center; }");
        html.append(".header h1 { margin: 0; font-size: 24px; font-weight: 600; }");
        html.append(".content { padding: 40px 30px; text-align: center; }");
        html.append(".content p { color: #555; font-size: 15px; margin: 0 0 20px 0; }");
        html.append(".button { display: inline-block; padding: 16px 40px; background: #0A8F47; color: white !important; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px; margin: 20px 0; }");
        html.append(".footer { text-align: center; padding: 20px; color: #999; font-size: 12px; background: #fafafa; }");
        html.append("</style></head>");
        html.append("<body>");
        html.append("<div class='container'>");
        html.append("<div class='header'><h1>New Profile Update Request</h1></div>");
        html.append("<div class='content'>");
        html.append("<p><strong>Student Name:</strong> ").append(studentName).append("</p>");
        html.append("<p><strong>Register Number:</strong> ").append(studentRegNo).append("</p>");
        html.append("<p>A student has submitted a profile update request and is waiting for your approval.</p>");
        html.append("<a href='").append(baseUrl).append("/admin/update-requests' class='button'>Review Request</a>");
        html.append("</div>");
        html.append("<div class='footer'>");
        html.append("<p>SIET Profile Management System</p>");
        html.append("<p>© 2026 Sri Shakthi Institute of Engineering and Technology</p>");
        html.append("</div>");
        html.append("</div>");
        html.append("</body></html>");
        return html.toString();
    }

    private String buildApprovalEmail(String studentName) {
        StringBuilder html = new StringBuilder();
        html.append("<!DOCTYPE html>");
        html.append("<html>");
        html.append("<head><style>");
        html.append("body { font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: rgb(240, 248, 240); }");
        html.append(".container { max-width: 500px; margin: 40px auto; background: #fff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }");
        html.append(".header { background: #0A8F47; color: white; padding: 40px 30px; text-align: center; }");
        html.append(".header h1 { margin: 0; font-size: 24px; font-weight: 600; }");
        html.append(".content { padding: 40px 30px; text-align: center; }");
        html.append(".content p { color: #555; font-size: 15px; margin: 0 0 20px 0; }");
        html.append(".success { color: #0A8F47; font-size: 24px; text-align: center; font-weight: 600; }");
        html.append(".footer { text-align: center; padding: 20px; color: #999; font-size: 12px; background: #fafafa; }");
        html.append("</style></head>");
        html.append("<body>");
        html.append("<div class='container'>");
        html.append("<div class='header'><h1>Profile Update Approved</h1></div>");
        html.append("<div class='content'>");
        html.append("<p>Dear <strong>").append(studentName).append("</strong>,</p>");
        html.append("<p class='success'>✅ Your profile update has been approved!</p>");
        html.append("<p>Your changes are now live and visible in the system.</p>");
        html.append("<p>Thank you for keeping your profile up to date.</p>");
        html.append("</div>");
        html.append("<div class='footer'>");
        html.append("<p>SIET Profile Management System</p>");
        html.append("<p>© 2026 Sri Shakthi Institute of Engineering and Technology</p>");
        html.append("</div>");
        html.append("</div>");
        html.append("</body></html>");
        return html.toString();
    }

    private String buildRejectionEmail(String studentName, String reason) {
        StringBuilder html = new StringBuilder();
        html.append("<!DOCTYPE html>");
        html.append("<html>");
        html.append("<head><style>");
        html.append("body { font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: rgb(240, 248, 240); }");
        html.append(".container { max-width: 500px; margin: 40px auto; background: #fff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }");
        html.append(".header { background: #f44336; color: white; padding: 40px 30px; text-align: center; }");
        html.append(".header h1 { margin: 0; font-size: 24px; font-weight: 600; }");
        html.append(".content { padding: 40px 30px; text-align: center; }");
        html.append(".content p { color: #555; font-size: 15px; margin: 0 0 20px 0; }");
        html.append(".error { color: #f44336; font-size: 20px; font-weight: 600; }");
        html.append(".footer { text-align: center; padding: 20px; color: #999; font-size: 12px; background: #fafafa; }");
        html.append("</style></head>");
        html.append("<body>");
        html.append("<div class='container'>");
        html.append("<div class='header'><h1>Profile Update Rejected</h1></div>");
        html.append("<div class='content'>");
        html.append("<p>Dear <strong>").append(studentName).append("</strong>,</p>");
        html.append("<p class='error'>❌ Your profile update has been rejected.</p>");
        html.append("<p><strong>Reason:</strong> ").append(reason != null ? reason : "Please contact admin for details").append("</p>");
        html.append("<p>Please make the necessary corrections and submit again.</p>");
        html.append("</div>");
        html.append("<div class='footer'>");
        html.append("<p>SIET Profile Management System</p>");
        html.append("<p>© 2026 Sri Shakthi Institute of Engineering and Technology</p>");
        html.append("</div>");
        html.append("</div>");
        html.append("</body></html>");
        return html.toString();
    }

    private String buildProfileUpdatedEmail(String studentName) {
        StringBuilder html = new StringBuilder();
        html.append("<!DOCTYPE html>");
        html.append("<html>");
        html.append("<head><style>");
        html.append("body { font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: rgb(240, 248, 240); }");
        html.append(".container { max-width: 500px; margin: 40px auto; background: #fff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }");
        html.append(".header { background: #0A8F47; color: white; padding: 40px 30px; text-align: center; }");
        html.append(".header h1 { margin: 0; font-size: 24px; font-weight: 600; }");
        html.append(".content { padding: 40px 30px; text-align: center; }");
        html.append(".content p { color: #555; font-size: 15px; margin: 0 0 20px 0; }");
        html.append(".button { display: inline-block; padding: 16px 40px; background: #0A8F47; color: white !important; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px; margin: 20px 0; }");
        html.append(".info { color: #666; font-size: 13px; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; }");
        html.append(".footer { text-align: center; padding: 20px; color: #999; font-size: 12px; background: #fafafa; }");
        html.append("</style></head>");
        html.append("<body>");
        html.append("<div class='container'>");
        html.append("<div class='header'><h1>Profile Updated</h1></div>");
        html.append("<div class='content'>");
        html.append("<p>Hello <strong>").append(studentName).append("</strong>,</p>");
        html.append("<p>Your student profile has been updated by the administrator.</p>");
        html.append("<p>You can view your updated profile by clicking the button below:</p>");
        html.append("<a href='").append(baseUrl).append("/dashboard' class='button'>View Profile</a>");
        html.append("<div class='info'>");
        html.append("<p>If you notice any incorrect information, please contact the placement cell.</p>");
        html.append("</div>");
        html.append("</div>");
        html.append("<div class='footer'>");
        html.append("<p>SIET Profile Management System</p>");
        html.append("<p>© 2026 Sri Shakthi Institute of Engineering and Technology</p>");
        html.append("</div>");
        html.append("</div>");
        html.append("</body></html>");
        return html.toString();
    }

    private String buildPasswordResetEmail(String userName, String resetUrl) {
        StringBuilder html = new StringBuilder();
        html.append("<!DOCTYPE html>");
        html.append("<html>");
        html.append("<head><style>");
        html.append("body { font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: rgb(240, 248, 240); }");
        html.append(".container { max-width: 500px; margin: 40px auto; background: #fff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }");
        html.append(".header { background: #0A8F47; color: white; padding: 40px 30px; text-align: center; }");
        html.append(".header h1 { margin: 0; font-size: 24px; font-weight: 600; }");
        html.append(".content { padding: 40px 30px; text-align: center; }");
        html.append(".content p { color: #555; font-size: 15px; margin: 0 0 20px 0; }");
        html.append(".button { display: inline-block; padding: 16px 40px; background: #0A8F47; color: white !important; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px; margin: 20px 0; }");
        html.append(".warning { color: #666; font-size: 13px; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; }");
        html.append(".footer { text-align: center; padding: 20px; color: #999; font-size: 12px; background: #fafafa; }");
        html.append("</style></head>");
        html.append("<body>");
        html.append("<div class='container'>");
        html.append("<div class='header'><h1>Password Reset</h1></div>");
        html.append("<div class='content'>");
        html.append("<p>Hello <strong>").append(userName).append("</strong>,</p>");
        html.append("<p>We received a request to reset your password.</p>");
        html.append("<p>Click the button below to create a new password:</p>");
        html.append("<a href='").append(resetUrl).append("' class='button'>Reset Password</a>");
        html.append("<div class='warning'>");
        html.append("<p><strong>This link expires in 5 minutes.</strong></p>");
        html.append("<p>If you didn't request this, you can safely ignore this email.</p>");
        html.append("</div>");
        html.append("</div>");
        html.append("<div class='footer'>");
        html.append("<p>SIET Profile Management System</p>");
        html.append("<p>© 2026 Sri Shakthi Institute of Engineering and Technology</p>");
        html.append("</div>");
        html.append("</div>");
        html.append("</body></html>");
        return html.toString();
    }
}