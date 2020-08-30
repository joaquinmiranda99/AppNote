import React, {Component} from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';


export default class CreateUser extends Component {

    state={ users : [], username:''  }
    onChangeUsername= async (e) => { 
        this.setState({username: e.target.value})
        const res = await axios.get('http://localhost:8080/api/users');
        this.setState({users : res.data});
    }
    onSubmit = async e => { 
        const res = await axios.post('http://localhost:8080/api/users', {
            username: this.state.username
        } );    
        this.setState({username: ''})
        console.log(res);
        e.persist();
     }

     deleteUser = async (id) => {
       await  axios.delete('http://localhost:8080/api/users/' + id);
       const res = await axios.get('http://localhost:8080/api/users');
        this.setState({users : res.data});
      }

   async componentDidMount(){
        const res = await axios.get('http://localhost:8080/api/users');
        this.setState({users : res.data});
    }


    render(){
        return (
            <div className="row">
                <div className="col-md-4">
                <div className="card card-body">
                <h3>Create New User</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <input type="text" className="form-control" 
                        value={this.state.username}
                        onChange={this.onChangeUsername} />
                    </div>
                    <button type="submit" className="btn btn-primary" >
                    Save
                    </button>
                </form>
                </div>
                </div>
                <div className="col-md-8">
                <ul className="list-group">
                {
                    this.state.users.map(user => (
                        <li className="list-group-item list-group-item-action"
                        key={user._id}
                        onDoubleClick={() => this.deleteUser(user._id)} 
                        >
                        {user.username}
                        </li>
                    ))
                }
                </ul>
                </div>
            </div>
        )
    }
}