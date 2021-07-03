import React from 'react';

class CalculatorComponent extends React.Component{
    emptyItem = {
        formula:'',
        result:''
    };
    constructor(props) {
        super(props);
        this.state = {
            item: this.emptyItem
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        console.log("here")
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let item = {...this.state.item};
        item[name] = value;
        console.log(value)
        this.setState({item});
    }

    async handleSubmit(event)
    {
        event.preventDefault();
        const {item} = this.state;
        const response =  await fetch('http://localhost:8080/api/v1/calculator', {
            method:  'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item),
        });
        item.result = await response.json();
        this.setState({item});
        console.log(item.result);
    }
    componentDidMount(){
        this.setState(this.emptyItem)
    }
    render() {
        const {item} = this.state;
    
        return (
            <div>
               <br/><br/><br/><br/> 
            <form   onSubmit={this.handleSubmit}  style={{
                backgroundColor: 'purple',
                             }}>
                <br></br> <br></br> <br></br> <br></br> <br></br>
          <b><font color="white">Formula:</font></b> <input name="formula" type="text" value={item.formula || ''} onChange={this.handleChange} />
          <br/><br/>
<b ><font color="white">Result:&nbsp;&nbsp;&nbsp;&nbsp;</font></b><input name="result" type="text" value={item.result || ''} readOnly="true" />
        <br/><br/>
        <input type="submit" value="Calculate" />
        <br/><br/>
        <br/><br/>
      </form>
      </div>
        )
    }
}

export default CalculatorComponent