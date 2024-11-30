import { jwtVerify } from 'jose';
import { NextRequest } from 'next/server';

export async function validateToken(request: NextRequest) {
  try {
    const token = request.headers.get('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return null;
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    
    return payload;
  } catch (error) {
    return null;
  }
}

export async function validateRoute(request: NextRequest) {
  const payload = await validateToken(request);
  
  if (!payload) {
    return Response.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }
  
  return payload;
}