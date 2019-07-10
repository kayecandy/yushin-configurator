<?php

	require_once( './config.php' );

    $boundary = md5( 'candicecanoso.com' ); 



    $attachments = $_FILES['file'];


    
    //construct a message body to be sent to recipient
    $message_body =  "A quote has been generated using our online tool. A copy is attached.\n";
    

    $headers = "MIME-Version: 1.0\r\n"; 
    $headers .= 'From:' . MAIL_FROM . "\r\n"; 
    $headers .= 'Bcc:' . MAIL_BCC . "\r\n"; 
    $headers .= "Content-Type: multipart/mixed; boundary = $boundary\r\n\r\n"; 
    
    //message text
    $body = "--$boundary\r\n";
    $body .= "Content-Type: text/plain; charset=ISO-8859-1\r\n";
    $body .= "Content-Transfer-Encoding: base64\r\n\r\n"; 
    $body .= chunk_split( base64_encode( $message_body ) ); 

    //attachments      
       
            
    //get file info
    $file_name = $attachments['name'];
    $file_size = $attachments['size'];
    $file_type = $attachments['type'];
    
    //read file 
    $handle = fopen( $attachments['tmp_name'], 'r' );
    $content = fread( $handle, $file_size );
    fclose( $handle );
    $encoded_content = chunk_split( base64_encode( $content ) ); //split into smaller chunks (RFC 2045)
    
    $body .= "--$boundary\r\n";
    $body .="Content-Type: $file_type; name=$file_name\r\n";
    $body .="Content-Disposition: attachment; filename=$file_name\r\n";
    $body .="Content-Transfer-Encoding: base64\r\n";
    $body .="X-Attachment-Id: " . rand(1000,99999) . "\r\n\r\n"; 
    $body .= $encoded_content; 
    
    
    $subject = MAIL_SUBJECT;

    if(!isset($_POST['email_to']) || empty($_POST['email_to'])){
        $_POST['email_to'] = MAIL_FROM;

        $subject = 'ERROR: NO QUOTE NUMBER';
    }


    
    $sentMail = mail( $_POST['email_to'], $subject, $body, $headers );
    // $sentMail = mail( MAIL_FROM, MAIL_SUBJECT, $body, $headers );

?>
