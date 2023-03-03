module.exports.userErrorHandler = (err) =>{

    // console.log(err.message, err.code);

    let error = {email: '', password: ''};

    if(err.code === 11000){
        error['email'] = 'This email is already exist on database!';
        return error;
    }

    // incorrect email 
    if(err.message === 'Incorrect Email'){
        error.email = 'That email is not register on database';
    }
    if(err.message === 'Incorrect Password'){
        error.password = 'Password did not match';
    }

    // validation error 
    if(err.message.includes('users validation failed')){
        Object.values(err.errors).forEach(({properties}) =>{
            error[properties.path] = properties.message;
        })
    }
    return error;
}