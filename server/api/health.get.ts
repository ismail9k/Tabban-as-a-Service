// GET /api/health
// Is the server alive? Spoiler: yes.
export default defineEventHandler(() => {
  return {
    status: 'ok',
    service: 'Tabban-as-a-Service (TaaS)',
    version: '1.0.0',
    message: '💥 Server is alive and ready to dispense Arabic rage.',
    timestamp: new Date().toISOString(),
    motto: 'تباً – Since forever.',
  }
})
