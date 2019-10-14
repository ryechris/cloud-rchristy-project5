/*
Verify Component


confirm = function() {
  const cognitoUser = new CognitoUser({
   Username: username,
   Pool: userPool
  })

  cognitoUser.confirmRegistration($('#code').val(), true, function (err, results) {
    if (err) {
        alert(err);
    } else {
        window.location = '/';
    }
  });
}

resend = function() {
  const cognitoUser = CognitoUser({
    Username: username,
    Pool: userPool
  })

  cognitoUser.resendConfirmationCode(function (err) {
    if (err) {
        alert(err);
    }
  })
}

<hr></hr>


<form>
    <label htmlFor="code">Code:</label>
    <input
      id="code"
      type="text"
    />
    <button onclick={this.handleConfirm}>Confirm</button>
    <button onclick={this.handleResend}>Resend</button>
</form>

{ if (this.state.XXX === '') {
    return (
      <form>
          <label htmlFor="code">Code:</label>
          <input
            id="code"
            type="text"
          />
          <button onclick={this.handleConfirm}>Confirm</button>
          <button onclick={this.handleResend}>Resend</button>
      </form>
    )
  }
}


this.props.history.push('/')
this.props.dispatch(handleAddUser({
  id: this.state.username,
  name: this.state.username,
}))


  */
