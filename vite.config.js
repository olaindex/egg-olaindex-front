import path from 'path'

export default {
  alias: {
    '/@/': path.resolve(__dirname, './src'),
  },
  optimizeDeps: {
    include: ['nprogress/nprogress.js'],
  },
}