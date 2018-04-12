<?php
session_start();


if(isset($_POST['afronden'])) {

    $yourOrder = $_REQUEST['yourOrder'];

    $voornaam = $_REQUEST['voornaam'];
    $achternaam = $_REQUEST['achternaam'];
    $telefoonnummer = $_REQUEST['telefoonnummer'];
    $email = $_REQUEST['email'];
    $straathuis = $_REQUEST['straathuis'];
    $postcode = $_REQUEST['postcode'];
    $opmerkingen = $_REQUEST['opmerkingen'];
    $betalingsmethode = $_REQUEST['betalingsmethode'];


    echo "<br>Uw Bestelling: " . $yourOrder;

    echo "<br>Voornaam: " . $voornaam;
    echo "<br>Achternaam: " . $achternaam;
    echo "<br>Telefoonnummer: " . $telefoonnummer;
    echo "<br>E-Mail: " . $email;
    echo "<br>Straatnaam en Huisnummer: " . $straathuis;
    echo "<br>Opmerkingen: " . $opmerkingen;
    echo "<br>Betalingsmethode: " . $betalingsmethode;
    echo "<br><br><br>Bestelling voltooid!";
}



?>
