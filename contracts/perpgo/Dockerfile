FROM solanalabs/rust:1.70.0

# Install Solana CLI
RUN sh -c "$(curl -sSfL https://release.solana.com/v1.16.19/install)"
ENV PATH="/root/.local/share/solana/install/active_release/bin:${PATH}"

# Install Anchor
RUN cargo install --git https://github.com/coral-xyz/anchor avm --locked
RUN avm install 0.27.0
RUN avm use 0.27.0

# Set working directory
WORKDIR /app

# Copy your project files
COPY . .

# Fix dependencies in Cargo.toml
RUN sed -i 's/pyth-sdk-solana = "0.10.0"/pyth-sdk-solana = "0.7.0"/' programs/perpgo/Cargo.toml
RUN sed -i 's/anchor-lang = "0.31.1"/anchor-lang = "0.27.0"/' programs/perpgo/Cargo.toml

# Build the project
RUN anchor build

# Set entrypoint
ENTRYPOINT ["/bin/bash"] 