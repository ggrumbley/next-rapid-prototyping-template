import type { NextApiHandler } from 'next';

const countHandler: NextApiHandler = async (request, response) => {
  if (request.method === 'POST') {
    // TODO: Fix Body Parser issue
    const { amount = 2 } = await request.body;

    // simulate IO latency
    await new Promise((resolve) => setTimeout(resolve, 500));

    response.status(200).json({ data: amount });
  }
};

export default countHandler;
