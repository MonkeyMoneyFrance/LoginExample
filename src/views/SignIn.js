import React , {useState} from 'react'
import FormField from '../components/FormField'
import Progress from '../components/Progress'
import zxcvbn from 'zxcvbn'
import '../styles/signIn.css'

export default function SignIn(){
  const [credentials,setCredentials] = useState({email:'',password:''})
  const onChange = (param) => setCredentials({...credentials,...param})

  const score = Math.max(1,Math.min(3,zxcvbn(credentials.password).score)) // restrict score range between 1 and 3
  const onSubmit = (e) => {
    e.preventDefault()
    return score < 2 ?  alert('Too weak') : alert('All good')
  }
  return (
    <div className={'mainDiv'}>
      <form className={'signInForm'} onSubmit={onSubmit}>
        <div className={'fields'}>
          <FormField type={'email'} id={'email'} label={'Email'} value={credentials.email} onChange={onChange} />
          <FormField type={'password'} id={'password'} label={'Password'} value={credentials.password} onChange={onChange} />

        <Progress score={!!credentials.password ? score  : -1}/>
        </div>
        <button type='submit' className='button'>Submit</button>
      </form>
    </div>
  )
}
