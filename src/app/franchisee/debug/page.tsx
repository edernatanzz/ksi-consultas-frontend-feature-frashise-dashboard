export default function FranchiseeDebugPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-green-600">✅ Franchisee está funcionando!</h1>
      <p>Página de debug do ambiente Franchisee</p>
      <div className="mt-4 p-4 bg-gray-100 rounded">
        <h2 className="font-semibold">Debug Info:</h2>
        <p>Path: /franchisee</p>
        <p>Timestamp: {new Date().toLocaleString()}</p>
      </div>
    </div>
  )
}
