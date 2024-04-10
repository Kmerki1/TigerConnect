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