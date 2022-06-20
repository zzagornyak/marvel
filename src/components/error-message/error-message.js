import errorImg from "./error.gif"


const ErrorMessage = () => {
    return (
        <img alt="Error" style={{display: 'block', width:"250px", height: "250px", objectFit: "contain" , margin: "0 auto"}} src={errorImg}/>
    )
}

export default ErrorMessage;