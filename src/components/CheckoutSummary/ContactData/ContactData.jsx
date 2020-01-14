import React, { Component } from 'react';

class ContactData extends Component {
    state = { 
        name : '',
        email : '',
        address : {
            city: '',
            pinCode: ''
        }
     }
    render() { 
        return ( 
            <div>
                <h4>Enter your Contact details</h4>
                <form>
                    
                </form>
            </div>
         );
    }
}
 
export default ContactData;