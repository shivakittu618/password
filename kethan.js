document.addEventListener("DOMContentLoaded", function () {
    const apiUrl = "https://crudcrud.com/api/68d929016b894786b4524daf126b3814/passwordData";
   
        const passwordForm = document.getElementById("passwordForm");
        const passwordList = document.getElementById("passwordList");
        const passwordCountElement = document.querySelector("h2");
        const searchInput = document.getElementById("search");
      
    
        function updatePasswordCount() {
          const passwords = passwordList.getElementsByTagName("li").length;
          passwordCountElement.textContent = `All Passwords: ${passwords}`;
        }
      
       
        function getPasswords() {
          axios.get(apiUrl)
            .then(response => {
              const passwords = response.data;
              passwords.forEach(password => {
                displayPasswordOnScreen(password);
              });
              updatePasswordCount();  
            })
            .catch(error => {
              console.error("Error fetching passwords:", error);
            });
        }
      
        
        getPasswords();
      
       
        passwordForm.addEventListener("submit", function (event) {
          event.preventDefault();
          const passwordDetails = {
            title: event.target.title.value,
            password: event.target.password.value,
          };
      
          axios
            .post(apiUrl, passwordDetails)
            .then((response) => {
              displayPasswordOnScreen(response.data);
              updatePasswordCount();  
            })
            .catch((error) => console.log(error));
      
        
          passwordForm.reset();
        });
      
        
        function displayPasswordOnScreen(passwordDetails) {
          const passwordItem = document.createElement("li");
          passwordItem.appendChild(
            document.createTextNode(
              `${passwordDetails.title}: ${passwordDetails.password}`
            )
          );
      
          const deleteBtn = document.createElement("button");
          deleteBtn.appendChild(document.createTextNode("Delete"));
          passwordItem.appendChild(deleteBtn);
      
          const editBtn = document.createElement("button");
          editBtn.appendChild(document.createTextNode("Edit"));
          passwordItem.appendChild(editBtn);
      
          passwordList.appendChild(passwordItem);
      
        
          deleteBtn.addEventListener("click", function () {
            axios.delete(`${apiUrl}/${passwordDetails._id}`)
              .then(() => {
                passwordList.removeChild(passwordItem);
                updatePasswordCount(); 
              })
              .catch(error => {
                console.error("Error deleting password:", error);
              });
          });
      
         
          editBtn.addEventListener("click", function () {
            
            document.getElementById("title").value = passwordDetails.title;
            document.getElementById("password").value = passwordDetails.password;
      
           
            axios.delete(`${apiUrl}/${passwordDetails._id}`)
              .then(() => {
                passwordList.removeChild(passwordItem);
                updatePasswordCount();  
              })
              .catch(error => {
                console.error("Error deleting password for edit:", error);
              });
          });
        }
      
      
        searchInput.addEventListener("input", function () {
          const searchQuery = searchInput.value.toLowerCase();
          const passwordItems = passwordList.getElementsByTagName("li");
      
          Array.from(passwordItems).forEach(item => {
            const itemText = item.textContent.toLowerCase();
            if (itemText.includes(searchQuery)) {
              item.style.display = "";
            } else {
              item.style.display = "none";
            }
          });
        });
      });
      
    

  