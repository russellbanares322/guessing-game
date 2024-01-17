export const throwContextError = (hookName: string, providerName: string) => {
    throw new Error(`${hookName} must be used within ${providerName}`)
}