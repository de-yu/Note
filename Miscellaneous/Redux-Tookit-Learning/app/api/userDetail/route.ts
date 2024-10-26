/* Core */
import { NextResponse } from 'next/server'

const name = [
  'zero',
  'one',
  'two',
  'three',
  'four'
];

const message = [
  'message zero',
  'message one',
  'message two',
  'message three',
  'message four'
];

export async function POST(req: Request) {

  const body = await req.json()
  const { id = 1 } = body

  // simulate IO latency
  await new Promise((r) => setTimeout(r, 500))

  return NextResponse.json({
    id,
    name: name[id],
    message: message[id]
  })
}

export async function PATCH(req: Request) {

  const body = await req.json()
  const { id = 1 } = body

  // simulate IO latency
  await new Promise((r) => setTimeout(r, 500))

  return NextResponse.json({
    id: id,
    isSuccess: true
  })
}

export async function DELETE(req: Request) {

  const body = await req.json()
  const { id = 1 } = body

  // simulate IO latency
  await new Promise((r) => setTimeout(r, 500))

  return NextResponse.json({
    isSuccess: true
  })
}
