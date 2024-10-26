/* Core */
import { NextResponse } from 'next/server'

const list = [{
  id: 1,
  name: 'Archer'
},
{
  id:2,
  name: 'Rider'
},
{
  id: 3,
  name: 'Saber'
}

];

export async function GET() {

  // simulate IO latency
  await new Promise((r) => setTimeout(r, 500))

  return NextResponse.json(list)
}
