<?php 
$bdd= new PDO('mysql:localhost;dbname=tg chat;charset=utf8','root','root')
if (isset($_POST['valider'])) {
if(isset($_POST['pseudo'])AND !empty($_POST['message'])){
	$pseudo=htmlspecialchars($_POST['pseudo']);
	$message=nl2br(htmlspecialchars($_POST['message']));
	$insererMessage=$bdd->prepare('INSERT INTO messages (pseudo, message)values(?,?');
	$insererMessage->execute(array($pseudo,$message));
}else{
	echo "check your TG ID";
}
}
?>
<!DOCTYPE html>
<html>
<head>
	<title>TG CHAT</title>
	<meta charset="utf-8">
</head>
<body>
<form method="POST"action="" align=center>
	<input type="text" name="pseudo">
	<br>
	<textarea name="message"></textarea>
	<br>
</form>
<SECTION id="messages"></SECTION>
</body>
</html>