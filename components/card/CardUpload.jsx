import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { css, cx } from 'react-emotion'
import { baseButton } from 'styles/button'
import Dropzone from 'react-dropzone'
import colors from 'styles/colors'

const styles = {
    preview: css`
        width: 15rem;
        height: auto;
        margin: 0 0 1rem;
    `,
    previewContainer: css`
        width: 100%;
        text-align: center;
    `,
    drop: css`
        margin: 1rem 0;
        border: 2px dashed ${ colors.orange };
        border-radius: 5px;
    `,
    inner: css`
        display: flex;
        flex-wrap: wrap;
        max-width: 100%;
        max-height: 100%;
        padding: 1rem;
        justify-content: center;
        align-items: center;
        color: ${ colors.white };
        font-size: 0.8rem;
    `,
    error: css`
        font-size: 0.8rem;
        color:${ colors.red };
    `,
    cancel: css`
        margin-right: 0.5rem;
    `
}

class CardUpload extends Component {
    state ={
        content: null,
        error: null
    }

    onCancel = () => this.setState({ content: null, error: null })

    onSubmit = () => this.props.onUpload(this.state.content)

    onDrop = (acceptedFiles, rejectedFiles) => {
        if (rejectedFiles.length > 0) {
            this.setState({ error: `File type not supported: ${ rejectedFiles[0].type }` })
        } else {
            const reader = new FileReader()
            reader.onloadend = () => this.setState({
                content: reader.result,
                error: null
            })
            reader.readAsDataURL(acceptedFiles[0])
        }
    }

    setPreviewRef = element => this.previewRef = element

    render() {
        const { content, error } = this.state

        if (content) {
            return (
                <div className={ styles.inner }>
                    <div className={ styles.previewContainer }>
                        <img className={ styles.preview } src={ content } alt='' />
                    </div>
                    <button className={ cx(baseButton, styles.cancel) } onClick={ this.onCancel }>Cancel</button>
                    <button className={ baseButton } onClick={ this.onSubmit }>Submit</button>
                </div>
            )
        } else {
            return (
                <Fragment>
                    <Dropzone
                        accept={ ['image/jpeg', 'image/png', 'image/jpg'] }
                        className={ styles.drop }
                        onDrop={ this.onDrop }
                    >
                        <div className={ styles.inner }>
                            <p>Click or drag and drop to upload an image. Wolfpack will translate the image into cards.</p>
                        </div>
                    </Dropzone>
                    { error && <p className={ styles.error }>{ error }</p> }
                </Fragment>
            )
        }
    }
}

CardUpload.propTypes = {
    onUpload: PropTypes.func.isRequired
}

export default CardUpload
