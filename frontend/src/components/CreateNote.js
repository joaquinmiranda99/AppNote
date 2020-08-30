import React, {Component} from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default class CreateNote extends Component {
state={users:[], userSelected:'',title:'', description:'', date : new Date(), editing: false, _id:''}


   async componentDidMount(){

      const res = await  axios.get('http://localhost:8080/api/users');
      this.setState({
          users: res.data.map(user => user.username),
        userSelected: res.data[0].username
        });
        if(this.props.match.params.id){
          const res=  await  axios.get('http://localhost:8080/api/notes/' + this.props.match.params.id)
            this.setState({
                title: res.data.title,
                description: res.data.description,
                userSelected: res.data.author,
                date: new Date(res.data.date),
                editing: true,
                _id: this.props.match.params.id
            })
        }
        
    }
    saveNote = async (e) =>{
        e.preventDefault();
        const newNote= {
            title: this.state.title,
            description: this.state.description,
            date: this.state.date,
            author: this.state.userSelected
        };
        if(this.state.editing){
            await  axios.put('http://localhost:8080/api/notes/'+ this.state._id, newNote);
        }else{
            await  axios.post('http://localhost:8080/api/notes', newNote);
        }
        
      
      window.location.href= '/';

    } 
    onChangeDate = date =>{
        this.setState({date});
    }
    onInputChange=e =>{
        this.setState({
         [e.target.name]: e.target.value
        })
    }
    render(){
        return (
            <div className="col-md-6 offset-md-3">
                <div className="card card-body">
                <h3>Create a Note</h3>
                    {/*Select user*/}
                    <div className="form-group">
                        <select className="form-control" name="userSelected" value={this.state.userSelected} onChange={this.onInputChange}>
                    { this.state.users.map(user => <option key={user} value={user}>
                        {user}
                    </option>) }    
                        </select>
                    </div>
                    
                <div className="form-group">
                        <input type="text" className="form-control" placeholder="Title" name="title" value={this.state.title} onChange={this.onInputChange} required/>
                    </div>
                    
                    <div className="form-group">
                        <textarea name="description" value={this.state.description} className="form-control" placeholder="Description" onChange={this.onInputChange} required />
                    </div>
                    <div className="form-group">
                        <DatePicker className="form-control" selected={this.state.date} onChange={this.onChangeDate}/>
                    </div>
                <form onSubmit={this.saveNote}>

                <button type="submit" className="btn btn-primary">Save a Note</button>
                </form>
                </div>
            </div>
        )
    }
}