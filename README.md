# Vježbe-Studenti
Web stranica urađena na predmetu Web tehnologije.

SPIRALA 1:
Spirala 1 je urađena koristeći HTML i CSS.
Nastavnik ima mogućnost pregleda liste studenata po grupama i timova unutar grupe. Elementi su raspoređeni po određenim rezolucijama. Stranica je raspoređena u tri diva: meni, grupe i studenti. Div meni sadrži linkove Grupe i Vježbe. Div grupe sadrži tabelu sa kolonama naziv grupe, broj studenata i termin. Div studenti sadrži prikaz studenata u vidu grid liste gdje jedan element sadrži: Ime i prezime, index, postotak tačno urađenih vježbi, broj neurađenih vježbi. Klik na link Vježbe iz menia vodi do stranice vježbe koji sadrži meni, odabirVježbe i graf. Student ima mogućnost da postavi svoj repozitorij za vježbe.

SPIRALA 2:
Spirala 2 je urađena koristeći JavaScript.
Implementiran je modul TestoviParser i metoda dajTacnost koja kao parametar prima JSON string koji predstavlja report nakon testiranja zadatka, a kao rezultat vraća procenat tačnosti zaokružen na jednu decimalu. Pored toga, implementirana je metoda porediRezultate koja kao prvi parametar prima prvi rezultat, a kao drugi parametar drugi rezultat.Rezultati su u JSON formatu. 

SPIRALA 3:
Spirala 3 je urađena koristeći Node.js/Express.js.
Implementirane su rute: GET/vjezbe/ i POST/vjezbe, te je napravljena stranica sa formom za unos broja vježbi i zadataka. Kada korisnik klikne na dugme pošalji zadatke šalje se putem Ajax-a.

SPIRALA 4:
Spirala 4 sadrži Sequelize modele za vježbe, zadatke, studente i grupe.
Na osnovu Spirale 1 urađena je Spirala 4 s tim da su dodate određene rute: POST/student, PUT/student/:index, POST/batch/student.
