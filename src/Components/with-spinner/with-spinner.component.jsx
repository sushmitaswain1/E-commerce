//this is a higher order component and if its still loading then spinner is displayed till we haven not received 
import React from 'react';
import {SpinnerOverlay, SpinnerContainer} from './with-spinner.styles';

const WithSpinner  = WrappedComponent => ({isLoading, ...otherProps})  => {
    return isLoading ? (
        <SpinnerOverlay>
        <SpinnerContainer/>
        </SpinnerOverlay> 
    ) : (
        <WrappedComponent {...otherProps}/>
    )
     
}

export default WithSpinner;