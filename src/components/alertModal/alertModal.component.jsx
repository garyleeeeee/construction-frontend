import './alertModal.styles.scss';

const AlertModal = (props) => {

    const {
        promptMessage,
        primaryLabel,
        primaryFunction,
        secondaryLabel,
        secondaryFunction
    } = props;

    return (

        <div className='alert-modal-overlay'>
            <div className='alert-modal-content'>
                <h3>{promptMessage}</h3>
                <div className='alert-modal-functions-container'>
                    <button className='alert-modal-secondary-button' onClick={()=>secondaryFunction()}>{secondaryLabel}</button>
                    <button className='alert-modal-primary-button' onClick={()=>primaryFunction()}>{primaryLabel}</button>
                </div>
            </div>
        </div>
    )
}

export default AlertModal;