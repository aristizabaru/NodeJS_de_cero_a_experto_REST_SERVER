import express from 'express'
import path from 'path'

interface Options {
    port: number
    public_path: string
}

export class Server {

    private app = express()
    private readonly port: number
    private readonly publicPath: string

    constructor(options: Options) {
        const { port, public_path } = options
        this.port = port
        this.publicPath = public_path
    }

    async start() {

        // Middleware

        // Public folder
        this.app.use(express.static(this.publicPath))

        // Routes
        this.app.get('/api/v1/todos', (req, res) => {
            res.status(200).json([
                { id: 1, text: 'study node', created_at: new Date() },
                { id: 2, text: 'design B&B', created_at: new Date() },
                { id: 3, text: 'migrate Clarios', created_at: new Date() },
            ])
        })

        // * SPA
        this.app.get('*', (req, res) => {
            console.log(req.url)

            const indexPath = path.join(__dirname + `../../../${this.publicPath}/index.html`)
            res.sendFile(indexPath)
        })

        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`)
        })
    }
}