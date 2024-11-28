<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Weryfikacja PESEL</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
        }
        .container {
            max-width: 400px;
            margin: 0 auto;
            padding: 20px;
            border: 1px solid #ccc;
            border-radius: 8px;
        }
        h1 {
            text-align: center;
        }
        label {
            display: block;
            margin-bottom: 10px;
        }
        input {
            width: 100%;
            padding: 8px;
            margin-bottom: 10px;
            border-radius: 4px;
            border: 1px solid #ccc;
        }
        button {
            width: 100%;
            padding: 10px;
            background-color: #4CAF50;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        }
        button:hover {
            background-color: #45a049;
        }
        .result {
            margin-top: 20px;
        }
    </style>
</head>
<body>

    <div class="container">
        <h1>Weryfikacja PESEL</h1>

        <label for="pesel">Podaj numer PESEL:</label>
        <input type="text" id="pesel" maxlength="11" placeholder="Wprowadź numer PESEL" />

        <button onclick="showPESELInfo()">Sprawdź informacje</button>

        <div class="result" id="result">
            <!-- Wyniki będą wyświetlane tutaj -->
        </div>
    </div>

    <script>
        // Funkcja weryfikująca numer PESEL
        function validatePESEL(pesel) {
            if (pesel.length !== 11 || !/^\d+$/.test(pesel)) {
                return false; // PESEL nie jest 11-cyfrowy lub zawiera inne znaki niż cyfry
            }

            const weights = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3];
            let sum = 0;

            for (let i = 0; i < 10; i++) {
                sum += parseInt(pesel[i]) * weights[i];
            }

            const controlNumber = (10 - (sum % 10)) % 10;
            return controlNumber === parseInt(pesel[10]);
        }

        // Tablica nazw miesięcy
        const months = [
            "Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec",
            "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"
        ];

        // Funkcja wyciągająca datę urodzenia
        function extractBirthDateFromPESEL(pesel) {
            if (!validatePESEL(pesel)) {
                return null;
            }

            const yearPart = pesel.substring(0, 2);
            const monthPart = pesel.substring(2, 4);
            const dayPart = pesel.substring(4, 6);

            let year = parseInt(yearPart);
            let month = parseInt(monthPart);
            let day = parseInt(dayPart);

            // Ustalamy pełny rok na podstawie miesiąca
            if (month > 80 && month <= 92) {
                year += 1800;
                month -= 80;
            } else if (month > 20 && month <= 32) {
                year += 2000;
                month -= 20;
            } else {
                year += 1900;
            }

            // Zwracamy datę z nazwą miesiąca
            return `${dayPart} ${months[month - 1]} ${year}`;
        }

        // Funkcja wyciągająca płeć
        function extractGenderFromPESEL(pesel) {
            if (!validatePESEL(pesel)) {
                return null;
            }

            const genderDigit = parseInt(pesel[9]);
            return genderDigit % 2 === 0 ? 'Kobieta' : 'Mężczyzna';
        }

        // Funkcja wyświetlająca wyniki
        function showPESELInfo() {
            const pesel = document.getElementById('pesel').value;
            const resultDiv = document.getElementById('result');
            resultDiv.innerHTML = ''; // Czyści poprzednie wyniki

            if (!validatePESEL(pesel)) {
                resultDiv.innerHTML = '<p style="color: red;">Nieprawidłowy numer PESEL.</p>';
                return;
            }

            const birthDate = extractBirthDateFromPESEL(pesel);
            const gender = extractGenderFromPESEL(pesel);

            resultDiv.innerHTML = `
                <p><strong>Data urodzenia:</strong> ${birthDate}</p>
                <p><strong>Płeć:</strong> ${gender}</p>
            `;
        }
    </script>

</body>
</html>

