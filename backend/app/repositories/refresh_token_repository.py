from datetime import datetime, timezone
from uuid import UUID

from sqlalchemy import select, update
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.refresh_token import RefreshToken


class RefreshTokenRepository:

    @staticmethod
    async def create(
        db: AsyncSession,
        token: RefreshToken,
    ) -> RefreshToken:
        db.add(token)
        await db.commit()
        await db.refresh(token)
        return token

    @staticmethod
    async def get_valid_token(
        db: AsyncSession,
        token_hash: str,
    ) -> RefreshToken | None:

        result = await db.execute(
            select(RefreshToken).where(
                RefreshToken.token_hash == token_hash,
                RefreshToken.revoked.is_(False),
                RefreshToken.expires_at > datetime.now(timezone.utc),
            )
        )

        return result.scalar_one_or_none()

    @staticmethod
    async def revoke(
        db: AsyncSession,
        token: RefreshToken,
    ) -> None:

        token.revoked = True

        await db.commit()

    @staticmethod
    async def revoke_all_for_user(
        db: AsyncSession,
        user_id: UUID,
    ) -> None:

        await db.execute(
            update(RefreshToken)
            .where(
                RefreshToken.user_id == user_id,
                RefreshToken.revoked.is_(False),
            )
            .values(revoked=True)
        )

        await db.commit()