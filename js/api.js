const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
const colorArray = ["info", "cozy", "success", "primary", "danger", "info", "cozy", "success", "primary", "danger"];


async function getTeachers() {
  try {
    const result = axios.get('http://localhost:4000/api/teachers');
    const { data: teachers } = await result;
    console.log(teachers);

    const teacherSection = document.getElementById("teachers")
    teachers.forEach(teacher => {
      let teacherCard = document.createElement('div')
      teacherCard.setAttribute("class", "col-sm-3 mb-2 teacher-card")
      teacherCard.innerHTML = `
        <img src="images/avatars/avatar-${teacher.Id}.jpg" />
        <span> ${teacher.Prefix} ${teacher.LastName} </span>
      `
      teacherSection.appendChild(teacherCard)
    })

  } catch (error) {
    console.error(error);
  }
}




async function getClasses() {
  try {
    const result = axios.get('http://localhost:4000/api/classes');
    const { data: classes } = await result;
    console.log(classes);
    const classesSection = document.getElementById('classes')

    classes.forEach((klass, index) => {
      console.log(klass.Id)
      let classCard = document.createElement('div')
      classCard.setAttribute("class", "card class-card-wrapper")
      classCard.innerHTML = `
      <img class="card-img-top" src="images/events/events-img${klass.Id}.jpg" alt="Course ${klass.Id}">
      <div class="calendar bg-${colorArray[index]}">
        <div> ${new Date(klass.Date).getDate()} </div>
        <div> ${monthNames[new Date(klass.Date).getMonth()]} </div>
      </div>
      <div class="card-body bg-${colorArray[index]}">
        <h4> ${klass.Title} </h4>
        <div>
          <div><i class="fas fa-calendar"></i> Age ${klass.MinAge} to ${klass.MaxAge} Years</div>
          <div><i class="fas fa-clock"></i> ${klass.Time}</div>
        </div>
        <p> ${klass.Description}</p>
        <button class="btn btn-warning learn-more-btn w-100"> LEARN MORE </button>
      </div>
      `
      console.log(klass)
      classesSection.appendChild(classCard)
    })
  } catch (error) {
    console.error(error);
  }
}

async function getCart(customerId) {
  try {
    const result = axios.get(`http://localhost:4000/api/cart/${customerId}`);
    const { data: cart } = await result;
    console.log(cart);

    const shoppingCart = document.getElementById("cart")
    const shoppingCartBurger = document.getElementById("cart-burger")

    const cartNumberIcon = document.createElement("span")
    cartNumberIcon.setAttribute("class", "bg-success cart-number")

    if (cart.length > 0) {
      cartNumberIcon.innerText = cart.length
      shoppingCart.append(cartNumberIcon)
      shoppingCartBurger.append(cartNumberIcon.cloneNode(true))
    }

  } catch (error) {
    console.error(error);
  }
}

getTeachers();
getClasses();
getCart(1);
