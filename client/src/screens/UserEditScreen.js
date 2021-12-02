import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { detailsUser, updateUser, updateUserProfile } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { USER_UPDATE_RESET } from '../constants/userConstants';

function UserEditScreen(props) {
    const userId = props.match.params.id;
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const userDetails = useSelector((state) => state.userDetails);
    const { loading, err, user } = userDetails;
    const userUpdate = useSelector((state) => state.userUpdate);
    const {
    loading: loadingUpdate,
    error: errUpdate,
    success: successUpdate,
    } = userUpdate;

    const dispatch = useDispatch();
    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: USER_UPDATE_RESET });
            props.history.push('/userlist');
          }
        if(!user){
            dispatch(detailsUser(userId));
        }
        else{
            setName(user.name);
            setEmail(user.email);
            setIsAdmin(user.isAdmin);
        }
    }, [dispatch, props.history, successUpdate, user, userId]);

    function submitHandler(e){
        e.preventDefault();
        dispatch(updateUser({ _id: userId, name, email, isAdmin }));
    }
    return (
        <div>
        {loading ? (
                 <LoadingBox></LoadingBox>
               ) : err ? (
                   <MessageBox variant="danger">{err}</MessageBox>
                 )
               :(
               
                <form className="form" onSubmit={submitHandler}>
                       <div>
                           <h1>User profile</h1>
                       </div>
       
                       {loadingUpdate && <LoadingBox></LoadingBox>}
                   {errUpdate && (
                     <MessageBox variant="danger">{errUpdate}</MessageBox>
                   )}
                   {successUpdate && (
                     <MessageBox variant="success">
                       Profile Updated Successfully
                     </MessageBox>
                   )}
                      
               <div>
                     <label htmlFor="name">Name</label>
                     <input
                       id="name"
                       type="text"
                       placeholder="Enter name"
                       value={name}
                       onChange={(e) => setName(e.target.value)}
                     ></input>
                   </div>
       
       
                   <div>
                     <label htmlFor="email">Email</label>
                     <input
                       id="email"
                       type="email"
                       placeholder="Enter email"
                       value={email}
                       onChange={(e) => setEmail(e.target.value)}
                     ></input>
                   </div>
                   
                 
                   <div>
              <label htmlFor="isAdmin">Is Admin</label>
              <input
                id="isAdmin"
                type="checkbox"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              ></input>
            </div>
       
       
                   <div>
                     <label />
                     <button className="primary" type="submit">
                       Update
                     </button>
                   </div>
                 
                   </form>
               )}
           </div>
         );
       }

export default UserEditScreen
