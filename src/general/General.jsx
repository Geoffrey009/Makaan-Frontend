import "./General.css"

export const General = ({ user, totalUsers }) => {
    if (!user) {
        return <h2>Hello Guest</h2>;
    }

    return (
        <>
            <div className="general">
                <h2>
                    Hello {user.fullName || user.name} {user.isAdmin ? "(Admin)" : ""} 👋
                </h2>

                {user.isAdmin && totalUsers !== null && (
                    <p>Total registered users: {totalUsers}</p>
                )}
            </div>
        </>
    );
};