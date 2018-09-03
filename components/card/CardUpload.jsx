import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { css, cx } from 'react-emotion'
import { baseButton } from 'styles/button'
import Dropzone from 'react-dropzone'
import FontAwesome from 'react-fontawesome'
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
    `,
    loading: css`
        width: 100%;
        display: flex;
        justify-content: center;
        margin-bottom: 0.5rem;
    `
}

class CardUpload extends Component {
    state = {
        preview: null,
        content: null,
        error: null
    }

    onCancel = () => this.setState({ content: null, error: null })

    onSubmit = () => this.props.onUpload(this.state.content)

    onDrop = (acceptedFiles, rejectedFiles) => {
        if (rejectedFiles.length > 0) {
            this.setState({ error: 'File type not supported or file is too large. Upload a PNG or JPEG image that is under 15MB.' })
        } else {
            const reader = new FileReader()
            reader.onload = event => this.setState({
                content: btoa(event.target.result),
                error: null
            })
            reader.readAsBinaryString(acceptedFiles[0])

            const previewReader = new FileReader()
            previewReader.onload = () => this.setState({ preview: previewReader.result })
            previewReader.readAsDataURL(acceptedFiles[0])
        }
    }

    render() {
        const { processingImage } = this.props
        const { content, error, preview } = this.state

        if (processingImage) {
            return (
                <div className={ styles.inner }>
                    <div className={ styles.loading }>
                        <FontAwesome size='lg' name='spinner' spin />
                    </div>
                    <p>This may take a moment...</p>
                </div>
            )
        }

        if (content) {
            return (
                <div className={ styles.inner }>
                    <div className={ styles.previewContainer }>
                        <img className={ styles.preview } src={ preview } alt='' />
                    </div>
                    <button className={ cx(baseButton, styles.cancel) } onClick={ this.onCancel }>Cancel</button>
                    <button className={ baseButton } onClick={ this.onSubmit }>Submit</button>
                </div>
            )
        }

        return (
            <Fragment>
                <Dropzone
                    accept={ ['image/jpeg', 'image/png', 'image/jpg'] }
                    className={ styles.drop }
                    maxSize={ 15000000 }
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

CardUpload.propTypes = {
    onUpload: PropTypes.func.isRequired,
    processingImage: PropTypes.bool.isRequired
}

export default CardUpload
