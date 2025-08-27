<?php
// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get form data
    $email = filter_var($_POST["email"], FILTER_SANITIZE_EMAIL);
    $message = htmlspecialchars($_POST["message"]);
    
    // Basic validation
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo json_encode(["success" => false, "message" => "Invalid email address."]);
        exit;
    }
    
    // Email details
    $to = "contact@grefins.com"; // Replace with actual recipient email
    $subject = "New Contact Form Submission from GREFINS Website";
    
    // Email headers
    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
    
    // Email content
    $email_content = "
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                color: #333;
            }
            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                border: 1px solid #eee;
            }
            .header {
                background-color: #0D0D0D;
                color: #fff;
                padding: 10px 20px;
                text-align: center;
            }
            .content {
                padding: 20px;
            }
            .footer {
                background-color: #f9f9f9;
                padding: 10px 20px;
                text-align: center;
                font-size: 12px;
                color: #666;
            }
        </style>
    </head>
    <body>
        <div class='container'>
            <div class='header'>
                <h2>New Contact Form Submission</h2>
            </div>
            <div class='content'>
                <p><strong>From:</strong> $email</p>
                <p><strong>Message:</strong></p>
                <p>$message</p>
            </div>
            <div class='footer'>
                <p>This email was sent from the GREFINS website contact form.</p>
            </div>
        </div>
    </body>
    </html>
    ";
    
    // Try to send the email
    if (mail($to, $subject, $email_content, $headers)) {
        // Success
        http_response_code(200);
        echo json_encode(["success" => true, "message" => "Your message has been sent successfully!"]);
    } else {
        // Failure
        http_response_code(500);
        echo json_encode(["success" => false, "message" => "Sorry, there was an error sending your message."]);
    }
} else {
    // Not a POST request
    http_response_code(403);
    echo json_encode(["success" => false, "message" => "There was a problem with your submission. Please try again."]);
}
?>