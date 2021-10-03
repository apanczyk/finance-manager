function authHeader() {
    const userStr = localStorage.getItem("user")
    let user = null
    if (userStr)
      user = JSON.parse(userStr)
  
    if (user && user.accessToken) {
      return { Authorization: user.accessToken }
    } else {
      return {}
    }
  }

  export default authHeader