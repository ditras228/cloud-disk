import {NextFunction} from 'express'
import {IReq} from '../typings/IRoute'

function staticPath(path: any) {
    return function (req: Request & IReq, res: Response, next: NextFunction) {
        req.static = path
        next()
    }
}

module.exports = staticPath