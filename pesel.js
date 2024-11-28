 <script>
       
        function validatePESEL(pesel) {
            if (pesel.length !== 11 || !/^\d+$/.test(pesel)) {
                return false;
            }

            const weights = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3];
            let sum = 0;

            for (let i = 0; i < 10; i++) {
                sum += parseInt(pesel[i]) * weights[i];
            }

            const controlNumber = (10 - (sum % 10)) % 10;
            return controlNumber === parseInt(pesel[10]);
        }

    
        const months = [
            "Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec",
            "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"
        ];

       
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

            
            if (month > 80 && month <= 92) {
                year += 1800;
                month -= 80;
            } else if (month > 20 && month <= 32) {
                year += 2000;
                month -= 20;
            } else {
                year += 1900;
            }

            
            return `${dayPart} ${months[month - 1]} ${year}`;
        }


        function extractGenderFromPESEL(pesel) {
            if (!validatePESEL(pesel)) {
                return null;
            }

            const genderDigit = parseInt(pesel[9]);
            return genderDigit % 2 === 0 ? 'Kobieta' : 'Mężczyzna';
        }

        function showPESELInfo() {
            const pesel = document.getElementById('pesel').value;
            const resultDiv = document.getElementById('result');
            resultDiv.innerHTML = ''; 
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
