import { NextResponse } from 'next/server';
import { userRepository } from '@/lib/db/user';

export async function GET() {
  try {
    const users = await userRepository.findAllSortedByScore();

    // Return users with rankings, excluding sensitive data
    const rankings = users.map((user, index) => ({
      rank: index + 1,
      id: user.id,
      username: user.username,
      score: user.score,
      cluesFound: user.discoveredClues.length,
    }));

    return NextResponse.json({ rankings });
  } catch (error) {
    console.error('Error fetching rankings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch rankings' },
      { status: 500 }
    );
  }
}
