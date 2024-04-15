function changeUsername()
{
  var newUsername = document.getElementById("newUsername").value;
  var confirmUsername = document.getElementById("confirmUsername").value;
  
  if ((newUsername.trim() === '') || (confirmUsername.trim() === ''))
  {
    alert("Please fill in both fields to complete this action.");
    return false;
  }
  if (newUsername !== confirmUsername)
  {
    alert("Both fields must match to complete this action.");
    return false;
  }
  if ((newUsername == confirmUsername) && (newUsername.trim() !== '') && (confirmUsername.trim() !== ''))
  {
    alert("Username successfully changed!");
    return true;
  }
  else
  {
    alert("An unexpected error occurred. Username could not securely be changed.");
    return false;
  }
}
function changePassword()
{
  var oldPassword = document.getElementById("oldPassword").value;
  var newPassword = document.getElementById("newPassword").value;
  var confirmPassword = document.getElementById("confirmPassword").value;
                                                
  if ((oldPassword.trim() === '') || (newPassword.trim() === '') || (confirmPassword.trim() === ''))
  {
    alert("Please fill in all fields to complete this actions.");
    return false;
  }
  if (1 !== 1)
  {
    <!--alert("Current password is incorrect.");-->
    <!--This would be code for confirming old passwords.-->
  }
  if (newPassword !== confirmPassword)
  {
    alert("New password fields do not match.");
    return false;
  }
  if ((1 === 1) && (newPassword == confirmPassword) && (oldPassword.trim() !== '') && (newPassword.trim() !== '') && (confirmPassword.trim() !== ''))
  {
    alert("Password successfully changed!");
    return true;
  }
  else
  {
    alert("An unexpected error occurred. Password could not securely be changed.");
    return false;
  }
}
document.addEventListener("DOMContentLoaded", function() 
{
    const emailForm = document.getElementById("emailForm");
    const emailList = document.getElementById("emailList");
    const addEmailButton = document.getElementById("addEmail");
    const removeEmailButton = document.getElementById("removeEmail");
    const savedEmails = JSON.parse(localStorage.getItem("emails")) || [];
	
    savedEmails.forEach(function(email) 
	{
        addEmailToList(email);
    });

    addEmailButton.addEventListener("click", function(event) 
	{
        event.preventDefault();
        const newEmailInput = document.getElementById("newEmail");
        const email = newEmailInput.value.trim();

        if (isValidEmail(email)) 
		{
            if (emailList.children.length < 9) 
			{
                if (!isDuplicateEmail(email)) 
				{
                    addEmailToList(email);
                    saveEmails();
                    newEmailInput.value = "";
                } 
				else 
				{
                    alert("This email address is already in the list.");
                }
            } 
			else 
			{
                alert("You can only have up to 10 email addresses.");
            }
        } 
		else 
		{
            alert("Please enter a valid email address.");
        }
    });

    removeEmailButton.addEventListener("click", function(event) 
	{
        event.preventDefault();
        const checkedEmails = Array.from(emailList.querySelectorAll('input[type="checkbox"]:checked'));
        checkedEmails.forEach(function(checkbox) 
		{
            if (checkbox.checked) 
			{
                checkbox.parentNode.remove();
            }
        });
        saveEmails();
    });

    function addEmailToList(email) 
	{
        const li = document.createElement("li");
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        const textNode = document.createTextNode(email);
        li.appendChild(checkbox);
        li.appendChild(textNode);
        emailList.appendChild(li);
    }

    function isValidEmail(email) 
	{
        const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        return emailRegex.test(email);
    }

    function isDuplicateEmail(email) 
	{
        const emails = Array.from(emailList.querySelectorAll('li')).map(function(li) 
		{
            return li.lastChild.textContent;
        });
        return emails.includes(email);
    }

    function saveEmails() {
        const emails = Array.from(emailList.querySelectorAll('li')).map(function(li) 
		{
            return li.lastChild.textContent;
        });
        localStorage.setItem("emails", JSON.stringify(emails));
    }
});

document.addEventListener("DOMContentLoaded", function() 
{
    const phoneForm = document.getElementById("phoneForm");
    const phoneList = document.getElementById("phoneList");
    const addPhoneButton = document.getElementById("addPhone");
    const removePhoneButton = document.getElementById("removePhone");
    const newPhoneInput = document.getElementById("newPhone");

    const savedPhones = JSON.parse(localStorage.getItem("phones")) || [];
    savedPhones.forEach(function(phone) 
	{
        addPhoneToList(formatPhoneNumberForDisplay(phone));
    });

    newPhoneInput.addEventListener("input", function() 
	{
        const formattedPhoneNumber = formatPhoneNumberForDisplay(newPhoneInput.value);
        newPhoneInput.value = formattedPhoneNumber;
    });

    addPhoneButton.addEventListener("click", function(event) 
	{
        event.preventDefault();
        let phone = newPhoneInput.value.replace(/\D/g, ""); // Remove non-digit characters

        if (isValidPhoneNumber(phone) && !isDuplicatePhoneNumber(phone)) 
		{
            addPhoneToList(formatPhoneNumberForDisplay(phone)); // Display formatted phone number in list
            savePhones();
            newPhoneInput.value = "";
        } 
		else if (isDuplicatePhoneNumber(phone)) 
		{
            alert("This phone number is already in the list.");
        } 
		else 
		{
            alert("Please enter a valid phone number.");
        }
    });

    removePhoneButton.addEventListener("click", function(event) 
	{
        event.preventDefault();
        const checkedPhones = Array.from(phoneList.querySelectorAll('input[type="checkbox"]:checked'));
        checkedPhones.forEach(function(checkbox) 
		{
            if (checkbox.checked) 
			{
                checkbox.parentNode.remove();
            }
        });
        savePhones();
    });

    function addPhoneToList(phone) 
	{
        const li = document.createElement("li");
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        const textNode = document.createTextNode(phone);
        li.appendChild(checkbox);
        li.appendChild(textNode);
        phoneList.appendChild(li);
    }

    function isValidPhoneNumber(phone) 
	{
        const phoneRegex = /^\d{10}$/;
        return phoneRegex.test(phone);
    }

    function isDuplicatePhoneNumber(phone) 
	{
        const existingPhones = Array.from(phoneList.querySelectorAll('li')).map(function(li) 
		{
            return li.lastChild.textContent.trim().replace(/\D/g, "");
        });
        return existingPhones.includes(phone);
    }

    function formatPhoneNumberForDisplay(phone) 
	{
        return phone.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
    }

    function savePhones() {
        const phones = Array.from(phoneList.querySelectorAll('li')).map(function(li) 
		{
            return li.lastChild.textContent.trim().replace(/\D/g, "");
		});
        localStorage.setItem("phones", JSON.stringify(phones));
    }
});

document.addEventListener('DOMContentLoaded', function() 
{
    const birthDaySelect = document.getElementById('birthDay');
    const birthMonthSelect = document.getElementById('birthMonth');
    const birthYearSelect = document.getElementById('birthYear');
    const submitBtn = document.getElementById('submitBtn');
    const ageDisplay = document.getElementById('ageDisplay');

    for (let year = 1920; year <= 2010; year++) 
	{
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        birthYearSelect.appendChild(option);
    }

    function calculateAge() 
	{
        // Get selected values
        const selectedDay = parseInt(birthDaySelect.value, 10);
        const selectedMonth = parseInt(birthMonthSelect.value, 10);
        const selectedYear = parseInt(birthYearSelect.value, 10);
        const isValidDate = isValidSelectedDate(selectedYear, selectedMonth, selectedDay);
		
        if (!isValidDate) 
		{
            console.log('Invalid date selected!');
            ageDisplay.textContent = '';
            return;
        }
        const birthDate = new Date(selectedYear, selectedMonth - 1, selectedDay);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) 
		{
            age--;
        }
        ageDisplay.textContent = `Your current age is ${age} years.`;
    }
    submitBtn.addEventListener('click', function() 
	{
        calculateAge();
    });
    calculateAge();
});

function isValidSelectedDate(year, month, day) 
{
    const selectedDate = new Date(year, month - 1, day);
    return (selectedDate.getFullYear() === year && selectedDate.getMonth() === month - 1 && selectedDate.getDate() === day);
}
