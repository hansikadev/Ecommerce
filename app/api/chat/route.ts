import { NextResponse } from 'next/server';

const DUMMY_PRODUCTS = [
  { _id: "1", name: "Premium Wireless Headphones", price: 299.99, category: "Electronics", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop" },
  { _id: "2", name: "Minimalist Smartwatch", price: 199.99, category: "Wearables", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop" },
  { _id: "3", name: "Ergonomic Desk Chair", price: 499.00, category: "Furniture", image: "https://images.unsplash.com/photo-1592078615290-033ee584e267?q=80&w=1000&auto=format&fit=crop" },
  { _id: "4", name: "Mechanical Keyboard", price: 149.99, category: "Accessories", image: "https://images.unsplash.com/photo-1595225476474-87563907a212?q=80&w=1000&auto=format&fit=crop" },
  { _id: "5", name: "Classic Leather Backpack", price: 129.99, category: "Accessories", image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1000&auto=format&fit=crop" },
  { _id: "6", name: "Ceramic Coffee Pour-Over", price: 45.00, category: "Home", image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?q=80&w=1000&auto=format&fit=crop" }
];

const extractProduct = (text: string) => {
  if (!text) return null;
  if (text.includes("headphone") || text.includes("audio")) return DUMMY_PRODUCTS.find(p => p._id === "1");
  if (text.includes("watch") || text.includes("smartwatch") || text.includes("wearable")) return DUMMY_PRODUCTS.find(p => p._id === "2");
  if (text.includes("chair") || text.includes("furniture")) return DUMMY_PRODUCTS.find(p => p._id === "3");
  if (text.includes("keyboard") || text.includes("mechanical")) return DUMMY_PRODUCTS.find(p => p._id === "4");
  if (text.includes("backpack") || text.includes("leather")) return DUMMY_PRODUCTS.find(p => p._id === "5");
  if (text.includes("coffee") || text.includes("pour-over")) return DUMMY_PRODUCTS.find(p => p._id === "6");
  return null;
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const messages = body.messages || [{ role: 'user', content: body.message || '' }];
    const query = messages[messages.length - 1].content.toLowerCase();

    // Context from the previous assistant message
    let previousAssistantMessage = "";
    if (messages.length > 1 && messages[messages.length - 2].role === "assistant") {
      previousAssistantMessage = messages[messages.length - 2].content.toLowerCase();
    }

    // Guard rail: Respond only to e-commerce/store related queries
    const storeKeywords = ["buy", "shop", "price", "cart", "product", "item", "brand", "best", "cheapest", "lowest", "recommend", "headphones", "watch", "chair", "keyboard", "backpack", "coffee", "shipping", "order", "return", "add", "remove", "delete", "drop", "it", "that", "this"];
    const isStoreQuery = storeKeywords.some(keyword => query.includes(keyword));

    if (!isStoreQuery) {
      return NextResponse.json({ 
        reply: "I am an e-commerce assistant dedicated to helping you shop at LuxeCart. Please ask me about our products, recommendations, or adding items to your cart." 
      });
    }

    const isRemoving = query.includes("remove") || query.includes("delete") || query.includes("drop");
    const isAdding = !isRemoving && (query.includes("add") || query.includes("buy"));
    // Lowest price logic
    if (query.includes("lowest") || query.includes("cheapest")) {
      const cheapest = [...DUMMY_PRODUCTS].sort((a, b) => a.price - b.price)[0];
      return NextResponse.json({
        reply: `Our lowest priced item is the ${cheapest.name} at $${cheapest.price.toFixed(2)}. ${isAdding ? "I have added it to your cart and opened it for you!" : "I am taking you to its details page now. Let me know if you want to add it to your cart!"}`,
        action: isAdding ? "ADD_TO_CART_AND_VIEW" : "VIEW_PRODUCT",
        product: cheapest
      });
    }

    // Best / Recommend logic (prioritizing the query, falling back to Chair)
    if (query.includes("best") || query.includes("recommend")) {
      const specificProduct = extractProduct(query) || extractProduct(previousAssistantMessage);
      const recommendedProduct = specificProduct || DUMMY_PRODUCTS.find(p => p._id === "3"); // Chair default

      return NextResponse.json({
        reply: `Our best-selling item and top brand recommendation is the ${recommendedProduct?.name}. It is priced at $${recommendedProduct?.price.toFixed(2)}. ${isAdding ? "I've added it to your cart!" : "Here are the product details."}`,
        action: isAdding ? "ADD_TO_CART_AND_VIEW" : "VIEW_PRODUCT",
        product: recommendedProduct
      });
    }

    // Explicit Product check in the current query
    let mentionedProduct = extractProduct(query);

    // Implicit Product check ("add *it*") referring to the previous message context
    const hasPronoun = query.includes("it") || query.includes("that") || query.includes("this");
    const isGenericAdd = query === "add" || query === "buy" || query === "remove" || query === "delete";
    
    if (!mentionedProduct && (hasPronoun || isGenericAdd)) {
      mentionedProduct = extractProduct(previousAssistantMessage);
    }

    // Identify if user is asking for a product we don't have
    if (!mentionedProduct && isAdding && !hasPronoun && !isGenericAdd) {
      return NextResponse.json({
        reply: "I'm sorry, but we don't carry that specific item. We currently offer headphones, a smartwatch, a desk chair, a keyboard, a leather backpack, and a coffee pour-over. Would you like to check out any of those?"
      });
    }
    
    // Explicit ADD/VIEW/REMOVE logic with identified product
    if (mentionedProduct) {
       if (isRemoving) {
         return NextResponse.json({
           reply: `I have removed the ${mentionedProduct.name} from your cart.`,
           action: "REMOVE_FROM_CART",
           product: mentionedProduct
         });
       }

       return NextResponse.json({
         reply: `${mentionedProduct.name} is priced at $${mentionedProduct.price.toFixed(2)}. ${isAdding ? "Adding it directly to your cart now!" : "Let me show you its details."}`,
         action: isAdding ? "ADD_TO_CART_AND_VIEW" : "VIEW_PRODUCT",
         product: mentionedProduct
       });
    }

    // Fallback if they asked to "add" something but we don't know what
    if (isAdding) {
      return NextResponse.json({
        reply: "Which item would you like me to add to your cart? Please specify the product name (e.g. 'smartwatch' or 'coffee maker')."
      });
    }

    if (isRemoving) {
      return NextResponse.json({
        reply: "Which item would you like me to remove from your cart? Please specify the product name."
      });
    }

    // Generic fallback for e-commerce
    return NextResponse.json({
      reply: "I can help you find products, tell you the lowest prices, or automatically add items like our Premium Headphones or Ergonomic Chair directly to your cart! Just ask me to recommend the best item or find the cheapest product."
    });

  } catch (error) {
    return NextResponse.json({ error: "Failed to process message." }, { status: 500 });
  }
}