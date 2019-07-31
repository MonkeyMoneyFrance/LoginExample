import React , {useState} from 'react'
import FormField from '../components/FormField'
import Progress from '../components/Progress'
import zxcvbn from 'zxcvbn' // heavy libray, API call would be prefered in prod mode ?
import '../styles/signIn.scss'

const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/

export default function SignIn(){
  const [credentials,setCredentials] = useState({email:'',password:''}); // variables of forms are stored here from children components
  const [buttonText,setButton] = useState('Submit'); // change text of the button once correctly submitted
  const score = Math.max(1,Math.min(3,zxcvbn(credentials.password).score)) // restrict score range between 1 and 3

  const onChange = (param) => setCredentials({...credentials,...param}) // triggered from children form fields
  const onSubmit = (e) => {
    e.preventDefault(); // do not refresh
    if (score >= 2 && emailRegex.test(credentials.email) && buttonText === 'Submit' ) { // test 1) no re-submit, 2) correct score of pass, correct mail regex
      alert('Form Was Submitted !');
      setButton('Submitted !'); // change text of button => will prevent from resubmit (a redirect could also do the trick)
    }
  }
  return (
    <div className={'mainDiv'}>
      <form className={'signInForm'} onSubmit={onSubmit}>
        <div className={'fields'}>
          <FormField
            required={true}
            disabled={buttonText !== 'Submit'}
            type={'email'}
            isError={!!credentials.email && !emailRegex.test(credentials.email)}
            id={'email'}
            label={'Email'}
            value={credentials.email}
            onChange={onChange} />
          <FormField
            required={true}
            disabled={buttonText !== 'Submit'}
            type={'password'}
            isError={!!credentials.password && score < 2}
            id={'password'}
            label={'Password'}
            value={credentials.password}
            onChange={onChange} />
          <Progress
            score={credentials.password ? score  : -1} //
          />
        </div>
        <button
          disabled = {buttonText !== 'Submit'} // prevent the click action
          aria-label={'Submit'}
          type={'submit'} // clicking the button will submit the form
          className={'button'}
          >
          {buttonText}
        </button>
      </form>
    </div>
  )
}
