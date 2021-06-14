import {DOMAttributes} from 'react'

declare module 'react' {
    interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
        directory?: string;
        webkitdirectory?: string;
        fileId?: string;
        fileType?: string;
        htmlFor?: string
    }
}