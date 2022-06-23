import { Component } from "react/cjs/react.production.min";

const Message = (props) => {
    return(
        <h2>The counter is {props.counter}</h2>
    )
}


class Counter extends Component{

    state={
        counter:0
    }

    changeCounter = () => {
        this.setState(({counter}) => ({
            counter: counter+1
        }))
    }
    render(){
        return(
            <>
                <button 
                    onClick={() => {
                        this.changeCounter()
                    }}
                    style={{width: "100px", height: "50px"}} >
                    Click me
                </button>

                {this.props.render(this.state.counter)}
            </>
        )
    }
}

{/* <Counter render={(counter) => (
                    <Message counter={counter}/>
                )} /> */}