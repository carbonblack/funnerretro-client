import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { css } from 'react-emotion'
import { baseButton } from 'styles/button'
import Dropzone from 'react-dropzone'
import colors from 'styles/colors'

const styles = {
    preview: css`
        width: 15rem;
        height: auto;
    `,
    drop: css`
        margin: 1rem 0;
        border: 2px dashed ${ colors.orange };
        border-radius: 5px;
    `,
    inner: css`
        display: flex;
        max-width: 100%;
        max-height: 100%;
        padding: 1rem;
        justify-content: center;
        align-items: center;
        color: ${ colors.white };
        font-size: 0.8rem;
    `
}

class CardUpload extends Component {
    state ={
        file: null,
        content: null
    }
    

    onSubmit = () => {
        this.props.onUpload(this.state.file)
    }

    onDrop = acceptedFiles => {
        const reader = new FileReader()
        const file = acceptedFiles[0]
        reader.onload = () => this.setState({ content: reader.result })
        reader.readAsDataURL(new Blob(file))

        const data = new FormData()
        data.append('file', file)
        
        this.setState({
            file: data
        })
    }

    setPreviewRef = element => this.previewRef = element

    render() {
        return (
            <Fragment>
                <Dropzone
                    accept={ ['img/jpeg', 'img/png', 'img/jpg'] }
                    className={ styles.drop }
                    name='file'
                    onDrop={ this.onDrop }
                >
                    <div className={ styles.inner }>
                        <p>Click or drag and drop images to upload images. Wolfpack will translate the image into cards.</p>
                    </div>
                </Dropzone>
                { this.state.file && <button className={ baseButton } onClick={ this.onSubmit }>Submit</button> }
                {/* <img className={ styles.preview } ref={ this.setPreviewRef } alt='' src={ this.state.content } /> */}
            </Fragment>
        )
    }
}

CardUpload.propTypes = {
    onUpload: PropTypes.func.isRequired
}

export default CardUpload
